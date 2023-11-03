import { PermissionCheckerService } from 'abp-ng2-module';
import { AppSessionService } from '@shared/common/session/app-session.service';

import { Injectable } from '@angular/core';
import { AppMenu } from './app-menu';
import { AppMenuItem } from './app-menu-item';

@Injectable()
export class AppNavigationService {

    constructor(private _permissionCheckerService: PermissionCheckerService, private _appSessionService: AppSessionService) { }

    getMenu(): AppMenu {
        return new AppMenu('MainMenu', 'MainMenu', [
            new AppMenuItem('Herramientas de conflictividad', '', 'fas fa-tools', '', [], [
                new AppMenuItem('Alertas de Situaciones Conflictivas', '', 'fas fa-exclamation-triangle', '', [], [
                    new AppMenuItem('Dashboard de Alertas de Situaciones Conflictivas', 'Pages.Application.SocialConflictAlertDashboard', 'fas fa-poll', '/app/application/dashboard/social-conflict-alert'),
                    new AppMenuItem('Bandeja de Alertas de Situaciones Conflictivas', 'Pages.Application.SocialConflictAlert', 'fas fa-bell', '/app/application/alerts', [
                        '/app/application/create-alert',
                        '/app/application/edit-alert/'
                    ]),
                    new AppMenuItem('Historial de envío de alertas de situaciones conflictivas', 'Pages.Application.SocialConflictAlert.History', 'fas fa-mail-bulk', '/app/application/alert-histories')
                ]),
                new AppMenuItem('Casos de Conflictividad Social', '', 'fas fa-columns', '', [], [
                    new AppMenuItem('Dashboard de Casos de Conflictividad Social', 'Pages.Application.SocialConflictDashboard', 'fas fa-poll', '/app/application/dashboard/social-conflict'),
                    new AppMenuItem('Bandeja de Casos de Conflictividad Social', 'Pages.Application.SocialConflict', 'far fa-folder', '/app/application/social-conflicts', [
                        '/app/application/create-social-conflict',
                        '/app/application/edit-social-conflict/'
                    ])
                ]),
                new AppMenuItem('Situaciones Sensibles al Conflicto', '', 'fas fa-city', '', [], [
                    new AppMenuItem('Dashboard de Situaciones Sensibles al Conflicto', 'Pages.Application.SocialConflictSensibleDashboard', 'fas fa-poll', '/app/application/dashboard/social-conflict-sensible'),
                    new AppMenuItem('Bandeja de Situaciones Sensibles al Conflicto', 'Pages.Application.SocialConflictSensible', 'fas fa-ruler-combined', '/app/application/sensibles', [
                        '/app/application/create-sensible',
                        '/app/application/edit-sensible/'
                    ])
                ]),
                new AppMenuItem('Actores de Conflictos Sociales', 'Pages.Application.SocialConflict.Actor', 'fas fa-people-carry', '/app/application/social-conflict-actors'),
                new AppMenuItem('Ayuda Memoria', 'Pages.Application.HelpMemory', 'fas fa-landmark', '/app/application/help-memories', [
                    '/app/application/create-help-memory',
                    '/app/application/edit-help-memory/'
                ]),
                new AppMenuItem('Bandeja de Tareas', 'Pages.Application.SocialConflictTaskManagement', 'fas fa-tasks', '/app/application/sc-task-managements'),
                new AppMenuItem('Historial de Envío de Notificaciones de Tareas', 'Pages.Application.SocialConflictTaskManagement.History', 'fas fa-mail-bulk', '/app/application/sc-task-management-histories')
            ]),
            new AppMenuItem('Herramientas de Compromisos', '', 'fas fa-receipt', '', [], [
                new AppMenuItem('Inicio', 'Pages.Administration.Host.Dashboard', 'flaticon-line-graph', '/app/admin/hostDashboard'),
                new AppMenuItem('Actas', 'Pages.Application.Record', 'far fa-comment-alt', '/app/application/records', [
                    '/app/application/records',
                    '/app/application/create-edit-record'
                ]),
                new AppMenuItem('Pedidos', 'Pages.Application.Record', 'far fa-clock', '/app/application/orders', [
                    '/app/application/orders',
                    '/app/application/create-edit-order'
                ]),
                new AppMenuItem('Seguimiento de Compromisos', 'Pages.Application.Compromise', 'fas fa-border-all', '/app/application/compromises', [
                    '/app/application/compromises',
                    '/app/application/create-edit-compromise'
                ]),
                new AppMenuItem('Bandeja de Tareas', 'Pages.Application.TaskManagement', 'fas fa-calendar-alt', '/app/application/task-management'),
                new AppMenuItem('Historial de Envío de Notificaciones de Tareas', 'Pages.Application.TaskManagement.History', 'fas fa-mail-bulk', '/app/application/task-management-histories'),
                new AppMenuItem('Reporte de Cumplimiento de Compromisos', 'Pages.Application.Compliance', 'fas fa-poll', '/app/application/compliances')
            ]),
            new AppMenuItem('Herramientas de Gestión de Conflictos ', '', 'fas fa-hammer', '', [], [
                new AppMenuItem('Plan de Intervención', 'Pages.ConflictTools.InterventionPlan', 'fas fa-anchor', '/app/conflict-tools/intervention-plan/dashboard', [
                    '/app/conflict-tools/intervention-plan/create',
                    '/app/conflict-tools/intervention-plan/edit/'
                ]),
                new AppMenuItem('Comité de Crisis', 'Pages.ConflictTools.CrisisCommittee', 'fas fa-poll', '/app/conflict-tools/crisis-committee', [
                    '/app/conflict-tools/create-crisis-committee',
                    '/app/conflict-tools/edit-crisis-committee/'
                ]),
                new AppMenuItem('Espacios de Diálogo', 'Pages.ConflictTools.DialogSpace', 'fas fa-archive', '/app/conflict-tools/dialog-space/dashboard', [
                    '/app/conflict-tools/dialog-space/create-dialog-space',
                    '/app/conflict-tools/dialog-space/edit-dialog-space/',
                    '/app/conflict-tools/dialog-space/create-document',
                    '/app/conflict-tools/dialog-space/edit-document/'
                ]),
                new AppMenuItem('Reuniones para la Gestión del Diálogo', 'Pages.ConflictTools.SectorMeet', 'fas fa-award', '/app/conflict-tools/sector-meet/dashboard', [
                    '/app/conflict-tools/sector-meet/create-meet',
                    '/app/conflict-tools/sector-meet/edit-meet/',
                    '/app/conflict-tools/sector-meet/create-session/',
                    '/app/conflict-tools/sector-meet/edit-session/',
                ])
            ]),
            new AppMenuItem('Herramientas para Análisis de Riesgos', '', 'fas fa-project-diagram', '', [], [
                new AppMenuItem('Riesgo Prospectivo Provincial', '', 'fas fa-database', '', [], [
                    new AppMenuItem('Gestión de Riesgo Prospectivo Provincial', 'Pages.Management.ProspectiveRisk', 'fas fa-pager', '/app/management/prospective-risk', [
                        '/app/management/prospective-risk/'
                    ]),
                    new AppMenuItem('Variables Cuantitativas', 'Pages.Management.DinamicVariable', 'fas fa-dice-d20', '/app/management/prospective-risk-dinamic-variable', [
                        '/app/management/prospective-risk-dinamic-variable/create',
                        '/app/management/prospective-risk-dinamic-variable/edit/'
                    ]),
                    new AppMenuItem('Dimensiones de Riesgo', 'Pages.Management.StaticVariable', 'fas fa-dice', '/app/management/prospective-risk-static-variable', [
                        '/app/management/prospective-risk-static-variable/create',
                        '/app/management/prospective-risk-static-variable/edit/'
                    ])
                ]),
                new AppMenuItem('Riesgo de Proyectos Estratégicos', '', 'fas fa-tasks', '', [], [
                    new AppMenuItem('Gestión de Riesgo de Proyectos Estratégicos', 'Pages.Management.ProjectRisk', 'fas fa-adjust', '/app/management/project-risk', [
                        '/app/management/project-risk/create',
                        '/app/management/project-risk/edit/'
                    ]),
                    new AppMenuItem('Etapas de Proyectos', 'Pages.Management.ProjectStage', 'fab fa-sith', '/app/management/project-stage', [
                        '/app/management/project-stage/create',
                        '/app/management/project-stage/edit/'
                    ]),
                    new AppMenuItem('Dimensiones de Riesgo', 'Pages.Management.StaticVariable', 'fas fa-dice', '/app/management/project-risk-static-variable', [
                        '/app/management/project-risk-static-variable/create',
                        '/app/management/project-risk-static-variable/edit/'
                    ]),
                    new AppMenuItem('Variables Cuantitativas', 'Pages.Management.DinamicVariable', 'fas fa-dice-d20', '/app/management/project-risk-dinamic-variable', [
                        '/app/management/project-risk-dinamic-variable/create',
                        '/app/management/project-risk-dinamic-variable/edit/'
                    ])
                ]),
            ]),
            new AppMenuItem('Catálogos', '', 'fas fa-address-book', '', [], [
                new AppMenuItem('Entidades del Estado Peruano', 'Pages.Catalog.DirectoryGovernment', 'fas fa-city', '/app/maintenance/directory-governments'),
                new AppMenuItem('Directorio de Empresas Privadas', 'Pages.Catalog.DirectoryIndustry', 'fas fa-industry', '/app/maintenance/directory-industries'),
                new AppMenuItem('Directorio de Diálogo y Conflictos Sociales', 'Pages.Catalog.DirectoryDialog', 'fas fa-comment', '/app/maintenance/directory-dialogs')
            ]),
            new AppMenuItem('Satisfacción de usuario', '', 'fas fa-comment', '', [], [
                new AppMenuItem('Bandeja de entrada de formularios', 'Pages.Quiz.Platform', 'fas fas fa-columns', '/app/quiz/platform', [
                    '/app/quiz/edit-platform/'
                ]),
                new AppMenuItem('Encuesta de satisfacción de usuario', 'Pages.Quiz.Customer', 'fas fa-comment-dots', '/app/quiz/customers'),
            ]),
            new AppMenuItem('Mantenimiento', '', 'fas fa-toolbox', '', [], [
                new AppMenuItem('Casos de Conflictividad Social', '', 'far fa-folder', '', [], [
                    new AppMenuItem('Analistas', 'Pages.Maintenance.Analyst', 'fas fa-chart-area', '/app/maintenance/analysts'),
                    new AppMenuItem('Coordinadores', 'Pages.Maintenance.Coordinator', 'fas fa-globe', '/app/maintenance/coordinators'),
                    new AppMenuItem('Gestores', 'Pages.Maintenance.Manager', 'fas fa-people-carry', '/app/maintenance/managers'),
                    new AppMenuItem('Capacidad de Movilización (Actores)', 'Pages.Maintenance.ActorMovement', 'fas fa-road', '/app/maintenance/actor-movements'),
                    new AppMenuItem('Hechos', 'Pages.Maintenance.Fact', 'fas fa-industry', '/app/maintenance/facts'),
                    new AppMenuItem('Riesgos', 'Pages.Maintenance.Risk', 'fas fa-exclamation-triangle', '/app/maintenance/risks'),
                    new AppMenuItem('Sectores responsables', 'Pages.Maintenance.Sector', 'fas fa-bezier-curve', '/app/maintenance/sectors'),
                    new AppMenuItem('Tipologías generales', 'Pages.Maintenance.Typology', 'fas fa-tape', '/app/maintenance/typologies'),
                    new AppMenuItem('Tipo de Actores', 'Pages.Maintenance.ActorType', 'fas fa-vector-square', '/app/maintenance/actor-types'),
                    new AppMenuItem('Tipo de gestiones', 'Pages.Maintenance.Management', 'fas fa-code-branch', '/app/maintenance/managements'),
                ]),
                new AppMenuItem('Alertas de Conflictividad Social', '', 'fas fa-bell', '', [], [
                    new AppMenuItem('Riesgos', 'Pages.Maintenance.AlertRisk', 'fas fa-exclamation-triangle', '/app/maintenance/alert-risks'),
                    new AppMenuItem('Atención de los Sectores', 'Pages.Maintenance.AlertSector', 'fas fa-bezier-curve', '/app/maintenance/alert-sectors'),
                    new AppMenuItem('Tipos de cierre', 'Pages.Maintenance.AlertSeal', 'fas fa-slash', '/app/maintenance/alert-seals'),
                    new AppMenuItem('Tipo de demandas', 'Pages.Maintenance.AlertDemand', 'fas fa-dolly', '/app/maintenance/alert-demands'),
                    new AppMenuItem('Subsecretarías responsables', 'Pages.Maintenance.AlertResponsible', 'fas fa-mail-bulk', '/app/maintenance/alert-responsibles'),
                ]),
                new AppMenuItem('Catálogos', '', 'fas fa-address-book', '', [], [
                    new AppMenuItem('Tipo de Entidad Pública', 'Pages.Maintenance.DirectoryGovernmentType', 'fas fa-globe', '/app/maintenance/directory-government-types'),
                    new AppMenuItem('Sectores del Directorio de Entidades del Estado Peruano', 'Pages.Maintenance.DirectoryGovernmentSector', 'fas fa-flag', '/app/maintenance/directory-government-sectors'),
                    new AppMenuItem('Cargo de los Responsables del Directorio de Diálogo y Conflictos Sociales', 'Pages.Maintenance.DirectoryResponsible', 'fas fa-vector-square', '/app/maintenance/directory-responsibles'),
                    new AppMenuItem('Sectores o Rubros del Directorio de Empresas Privadas', 'Pages.Maintenance.DirectorySector', 'fas fa-archway', '/app/maintenance/directory-sectors'),
                    new AppMenuItem('Niveles de Gobierno', 'Pages.Maintenance.DirectoryGovernmentLevel', 'fas fa-vote-yea', '/app/maintenance/directory-government-levels'),
                    new AppMenuItem('Tipos de Conflicto por Naturaleza', 'Pages.Maintenance.DirectoryConflictType', 'fas fa-file-signature', '/app/maintenance/directory-conflict-types')
                ]),
                new AppMenuItem('Compromisos', '', 'fas fa-border-all', '', [], [
                    new AppMenuItem('Actores responsables', 'Pages.Maintenance.ResponsibleActor', 'fas fa-comments', '/app/maintenance/responsible-actors'),
                    new AppMenuItem('Etiquetas', 'Pages.Maintenance.CompromiseLabel', 'fas fa-tag', '/app/maintenance/compromise-labels'),
                    new AppMenuItem('Fases y etapas', 'Pages.Maintenance.Phase', 'fas fa-quote-left', '/app/maintenance/phases'),
                    new AppMenuItem('Tipos y subtipos de Actores', 'Pages.Maintenance.ResponsibleType', 'fas fa-user-tag', '/app/maintenance/responsible-types'),
                    new AppMenuItem('Tipo de documento de sustentos', 'Pages.Maintenance.RecordResourceType', 'fas fa-book', '/app/maintenance/record-resource-types'),
                    new AppMenuItem('Criterios de seguimiento', 'Pages.Maintenance.CompromiseState', 'fas fa-wave-square', '/app/maintenance/compromise-states'),
                ]),
                new AppMenuItem('Herramientas de Gestión de Conflictos', '', 'fas fa-anchor', '', [], [
                    new AppMenuItem('Opciones de intervención', 'Pages.Maintenance.InterventionPlanOption', 'fas fa-comments', '/app/maintenance/intervention-plan-options'),
                    new AppMenuItem('Tipo de actividades', 'Pages.Maintenance.InterventionPlanActivity', 'fas fa-chart-line', '/app/maintenance/intervention-plan-activities'),
                    new AppMenuItem('Tipo de entidades', 'Pages.Maintenance.InterventionPlanEntity', 'fas fa-archive', '/app/maintenance/intervention-plan-entities'),
                    new AppMenuItem('Roles de equipo', 'Pages.Maintenance.InterventionPlanRole', 'fas fa-pencil-ruler', '/app/maintenance/intervention-plan-roles'),
                    new AppMenuItem('Cargos de integrantes de comité de crisis', 'Pages.Maintenance.CrisisCommitteeJob', 'fas fa-user-nurse', '/app/maintenance/crisis-committee-jobs')
                ]),
                new AppMenuItem('Satisfacción de usuario', '', 'fas fa-comment', '', [], [
                    new AppMenuItem('Configuración de mensaje de respuesta automática', 'Pages.Quiz.Responses', 'fas fa-envelope', '/app/quiz/responses'),
                    new AppMenuItem('Estado de gestión de la encuesta', 'Pages.Quiz.States', 'fas fa-anchor', '/app/quiz/states', [
                        '/app/quiz/create-quiz-state',
                        '/app/quiz/edit-quiz-state/'
                    ])
                ]),
                new AppMenuItem('Espacios de Diálogo', '', 'fas fa-archive', '', [], [
                    new AppMenuItem('Tipo de Espacio de Diálogo', 'Pages.Maintenance.DialogSpaceType', 'fas fa-comment', '/app/maintenance/dialog-space-types'),
                    new AppMenuItem('Tipos de documentos', 'Pages.Maintenance.DialogSpaceDocumentType', 'fas fa-paste', '/app/maintenance/dialog-space-document-types'),
                    new AppMenuItem('Situaciones de Documentos', 'Pages.Maintenance.DialogSpaceDocumentSituation', 'fas fa-sitemap', '/app/maintenance/dialog-space-document-situations'),
                    new AppMenuItem('Días feriados', 'Pages.Maintenance.DialogSpaceHoliday', 'fas fa-calendar', '/app/maintenance/dialog-space-holidays'),
                ]),
                new AppMenuItem('Actores', 'Pages.Maintenance.Actor', 'fas fa-people-carry', '/app/maintenance/actors'),
                new AppMenuItem('Ubigeos', 'Pages.Maintenance.Ubigeo', 'fas fa-map-marked-alt', '/app/maintenance/ubigeos'),
                new AppMenuItem('Centros Poblados', 'Pages.Maintenance.Ubigeo', 'fas fa-map-marked-alt', '/app/maintenance/regions'),
                new AppMenuItem('Unidades Territoriales', 'Pages.Maintenance.TerritorialUnit', 'fas fa-map-pin', '/app/maintenance/territorial-units')
            ]),
            new AppMenuItem('Administración', '', 'flaticon-interface-8', '', [], [
                new AppMenuItem('Roles', 'Pages.Administration.Roles', 'flaticon-suitcase', '/app/admin/roles'),
                new AppMenuItem('Usuarios', 'Pages.Administration.Users', 'flaticon-users', '/app/admin/users'),
                new AppMenuItem('Auditoría', 'Pages.Administration.AuditLogs', 'flaticon-folder-1', '/app/admin/auditLogs'),
                new AppMenuItem('Mantenimiento', 'Pages.Administration.Host.Maintenance', 'flaticon-lock', '/app/admin/maintenance'),
                new AppMenuItem('Configuración', 'Pages.Administration.Tenant.Settings', 'flaticon-settings', '/app/admin/tenantSettings')
            ]),
            new AppMenuItem('Cerrar sesión', '', 'fas fa-sign-out-alt', '/app/application/logout')
        ]);
    }

    checkChildMenuItemPermission(menuItem: any): boolean {

        for (let i = 0; i < menuItem.items.length; i++) {
            let subMenuItem = menuItem.items[i];

            if (subMenuItem.permissionName === '' || subMenuItem.permissionName === null) {
                if (subMenuItem.route) {
                    return true;
                }
            } else if (this._permissionCheckerService.isGranted(subMenuItem.permissionName)) {
                return true;
            }

            if (subMenuItem.items && subMenuItem.items.length) {
                let isAnyChildItemActive = this.checkChildMenuItemPermission(subMenuItem);
                if (isAnyChildItemActive) {
                    return true;
                }
            }
        }
        return false;
    }

    showMenuItem(menuItem: AppMenuItem): boolean {
        if (menuItem.permissionName === 'Pages.Administration.Tenant.SubscriptionManagement' && this._appSessionService.tenant && !this._appSessionService.tenant.edition) {
            return false;
        }

        let hideMenuItem = false;

        if (menuItem.requiresAuthentication && !this._appSessionService.user) {
            hideMenuItem = true;
        }

        if (menuItem.permissionName && !this._permissionCheckerService.isGranted(menuItem.permissionName)) {
            hideMenuItem = true;
        }

        if (this._appSessionService.tenant || !abp.multiTenancy.ignoreFeatureCheckForHostUsers) {
            if (menuItem.hasFeatureDependency() && !menuItem.featureDependencySatisfied()) {
                hideMenuItem = true;
            }
        }

        if (!hideMenuItem && menuItem.items && menuItem.items.length) {
            return this.checkChildMenuItemPermission(menuItem);
        }

        return !hideMenuItem;
    }

    /**
     * Returns all menu items recursively
     */
    getAllMenuItems(): AppMenuItem[] {
        let menu = this.getMenu();
        let allMenuItems: AppMenuItem[] = [];
        menu.items.forEach(menuItem => {
            allMenuItems = allMenuItems.concat(this.getAllMenuItemsRecursive(menuItem));
        });

        return allMenuItems;
    }

    private getAllMenuItemsRecursive(menuItem: AppMenuItem): AppMenuItem[] {
        if (!menuItem.items) {
            return [menuItem];
        }

        let menuItems = [menuItem];
        menuItem.items.forEach(subMenu => {
            menuItems = menuItems.concat(this.getAllMenuItemsRecursive(subMenu));
        });

        return menuItems;
    }
}
