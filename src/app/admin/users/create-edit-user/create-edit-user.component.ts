import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrUpdateUserInput, PasswordComplexitySetting, ProfileServiceProxy, UserEditDto, UserRoleDto, UserServiceProxy, OptionDto, PersonType, UserAlertResponsibleDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { UtilityPersonDto } from '@shared/service-proxies/application/utility-proxie';

@Component({
    selector: 'create-edit-user',
    templateUrl: 'create-edit-user.component.html',
    styleUrls: [
        'create-edit-user.component.css'
    ]
})
export class CreateEditUserModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() findPerson: EventEmitter<boolean> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();

    user: UserEditDto = new UserEditDto();
    roles: UserRoleDto[];
    responsibles: UserAlertResponsibleDto[];
    profilePicture: string;
    passwordComplexityInfo = '';
    userPasswordRepeat = '';

    userTypes: OptionDto[] = [
        { name: 'Administrativo', value: PersonType.None },
        { name: 'Coordinador', value: PersonType.Coordinator },
        { name: 'Gestor', value: PersonType.Manager },
        { name: 'Analista', value: PersonType.Analyst }
    ]

    types = {
        adminitrative: PersonType.None,
        coordinator: PersonType.Coordinator,
        manager: PersonType.Manager,
        analyst: PersonType.Analyst
    }

    get userTypeSearch() {
        return (this.user.type == PersonType.Coordinator ? 'Buscar coordinador' :
            this.user.type == PersonType.Manager ? 'Buscar gestor' :
                this.user.type == PersonType.Analyst ? 'Buscar analista' : '');
    }

    get userTypeSelected() {
        return (this.user.type == PersonType.Coordinator ? 'Coordinador' :
            this.user.type == PersonType.Manager ? 'Gestor' :
                this.user.type == PersonType.Analyst ? 'Analista' : '');
    }

    constructor(injector: Injector, private _userService: UserServiceProxy, private _profileService: ProfileServiceProxy) {
        super(injector);
    }

    show(userId?: number): void {
        this._userService.getUserForEdit(userId).subscribe(userResult => {
            this.user = userResult.user;
            this.roles = userResult.roles;
            this.responsibles = userResult.responsibles;
            if (!this.user.id)
                this.user.generatePerson = true;
            this._profileService.getPasswordComplexitySetting().subscribe(passwordComplexityResult => {
                this.passwordComplexitySetting = passwordComplexityResult.setting;
                this.setPasswordComplexityInfo();
                this.active = true;
                this.modal.show();
            });
        });
    }

    savePerson(person: UtilityPersonDto) {
        this.user.person = person;
    }

    setPasswordComplexityInfo(): void {

        this.passwordComplexityInfo = '<ul>';

        if (this.passwordComplexitySetting.requireDigit) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireDigit_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requireLowercase) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireLowercase_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requireUppercase) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireUppercase_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requireNonAlphanumeric) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequireNonAlphanumeric_Hint') + '</li>';
        }

        if (this.passwordComplexitySetting.requiredLength) {
            this.passwordComplexityInfo += '<li>' + this.l('PasswordComplexity_RequiredLength_Hint', this.passwordComplexitySetting.requiredLength) + '</li>';
        }

        this.passwordComplexityInfo += '</ul>';
    }

    onShown(): void {
        document.getElementById('Name').focus();
    }

    save(): void {
        let input = new CreateOrUpdateUserInput();

        input.user = this.user;
        input.assignedRoleNames = _.map(_.filter(this.roles, { isAssigned: true, inheritedFromOrganizationUnit: false }), role => role.roleName);

        if (input.user.blankPassword) {
            input.user.password = this.appSession.codeText(this.user.blankPassword);
        }
        this.saving = true;
        this._userService.createOrUpdateUser(input)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.userPasswordRepeat = '';
        this.modal.hide();
    }

    getAssignedRoleCount(): number {
        return _.filter(this.roles, { isAssigned: true }).length;
    }
}
