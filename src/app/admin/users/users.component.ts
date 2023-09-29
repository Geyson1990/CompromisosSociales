import { Component, Injector, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { EntityDtoOfInt64, PersonType, UserListDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent } from 'primeng/public_api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateEditUserModalComponent } from './create-edit-user/create-edit-user.component';
import { ImpersonationService } from './impersonation.service';
import { finalize } from 'rxjs/operators';
import { FindPersonComponent } from '@shared/component/find-person/find-person.component';
import { UtilityPersonDto } from '@shared/service-proxies/application/utility-proxie';
import { AssignConflictUserComponent } from './assing-conflict-user/assign-conflict-user.component';

@Component({
    templateUrl: './users.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./users.component.less'],
    animations: [appModuleAnimation()]
})
export class UsersComponent extends AppComponentBase implements AfterViewInit {

    @ViewChild('createOrEditUserModal', { static: true }) createOrEditUserModal: CreateEditUserModalComponent;
    @ViewChild('assignConflictUser', { static: true }) assignConflictUser: AssignConflictUserComponent;
    
    @ViewChild('findPersonModal', { static: true }) findPersonModal: FindPersonComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    role = '';
    onlyLockedUsers = false;

    types = {
        adminitrative: PersonType.None,
        coordinator: PersonType.Coordinator,
        manager: PersonType.Manager,
        analyst: PersonType.Analyst
    }

    constructor(
        injector: Injector,
        public _impersonationService: ImpersonationService,
        private _userServiceProxy: UserServiceProxy,
        private _activatedRoute: ActivatedRoute) {
        super(injector);
        this.filterText = this._activatedRoute.snapshot.queryParams['filterText'] || '';
    }

    ngAfterViewInit(): void {
        this.primengTableHelper.adjustScroll(this.dataTable);
    }

    getUsers(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);

            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._userServiceProxy.getUsers(
            this.filterText,
            this.onlyLockedUsers,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event)
        ).pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator())).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    unlockUser(record: UserListDto): void {
        this.message.confirm(`El siguiente proceso permite al usuario "${record.emailAddress}" acceder nuevamente al sistema`, '¿Esta seguro de continuar?', confirmation => {
            if (confirmation) {
                this._userServiceProxy.unlockUser(new EntityDtoOfInt64({ id: record.id })).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(`Se ha desbloqueado al usuario ${record.emailAddress} exitosamente`);
                });
            }
        });
    }

    lockUser(record: UserListDto): void {
        this.message.confirm(`El siguiente proceso cerrará todas las sesiones del usuario "${record.emailAddress}" y no podrá acceder nuevamente al sistema`, '¿Esta seguro de continuar?', confirmation => {
            if (confirmation) {
                this._userServiceProxy.lockUser(new EntityDtoOfInt64({ id: record.id })).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(`Se ha bloqueado al usuario ${record.emailAddress} exitosamente`);
                });
            }
        });
    }

    editUser(record: UserListDto) {
        this.createOrEditUserModal.show(record.id);
    }

    assignConflicts(record: UserListDto) {
        this.assignConflictUser.show(record.id);
    }

    getRolesAsString(roles: any): string {
        let roleNames = '';

        for (let j = 0; j < roles.length; j++) {
            if (roleNames.length) {
                roleNames = roleNames + ', ';
            }

            roleNames = roleNames + roles[j].roleName;
        }

        return roleNames;
    }

    savePerson(person: UtilityPersonDto) {
        this.createOrEditUserModal.savePerson(person);
    }

    showFindPerson() {
        this.findPersonModal.show();
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createUser(): void {
        this.createOrEditUserModal.show();
    }

    deleteUser(user: UserListDto): void {
        this.message.confirm(this.l('UserDeleteWarningMessage', user.emailAddress), this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._userServiceProxy.deleteUser(user.id)
                    .subscribe(() => {
                        this.reloadPage();
                        this.notify.success(this.l('SuccessfullyDeleted'));
                    });
            }
        });
    }

    getUserType(user: UserListDto) {
        switch (user.type) {
            case PersonType.Coordinator: return 'Coordinador';
            case PersonType.Manager: return 'Gestor';
            case PersonType.Analyst: return 'Analista';
            default: return 'Administrativo';
        }
    }

}
