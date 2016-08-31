
function RouteMappingsTab(id)
{
    Tab.call(this, id, Constants.FILENAME__ROUTE_MAPPINGS, Constants.URL__ROUTE_MAPPINGS_VIEW_MODEL);
}

RouteMappingsTab.prototype = new Tab();

RouteMappingsTab.prototype.constructor = RouteMappingsTab;

RouteMappingsTab.prototype.getColumns = function()
{
    return [
               {
                   "title":     Tab.prototype.formatCheckboxHeader(this.id),
                   "type":      "html",
                   "width":     "2px",
                   "orderable": false,
                   "render":    $.proxy(function(value, type, item)
                   {
                       return this.formatCheckbox(item[1], value);
                   },
                   this),
               },
               {
                   "title":  "GUID",
                   "width":  "200px",
                   "render": Format.formatString
               },
               {
                   "title":  "Created",
                   "width":  "180px",
                   "render": Format.formatString
               },
               {
                   "title":  "Updated",
                   "width":  "180px",
                   "render": Format.formatString
               },
               {
                   "title":  "Name",
                   "width":  "150px",
                   "render": Format.formatApplicationName
               },
               {
                   "title":  "GUID",
                   "width":  "200px",
                   "render": Format.formatString
               },
               {
                   "title":  "URI",
                   "width":  "200px",
                   "render": Format.formatURI
               },
               {
                   "title":  "GUID",
                   "width":  "200px",
                   "render": Format.formatString
               },
               {
                   "title":  "Target",
                   "width":  "200px",
                   "render": Format.formatTarget
               }
           ];
};

RouteMappingsTab.prototype.getActions = function()
{
    return [
               {
                   text: "Delete",
                   click: $.proxy(function()
                   {
                       this.deleteChecked("Are you sure you want to delete the selected route mappings?",
                                          "Delete",
                                          "Deleting Route Mappings",
                                          Constants.URL__ROUTE_MAPPINGS,
                                          "");
                   },
                   this)
               }
           ];
};

RouteMappingsTab.prototype.clickHandler = function()
{
    this.itemClicked(-1, 1);
};

RouteMappingsTab.prototype.showDetails = function(table, objects, row)
{
    var app_route    = objects.app_route;
    var application  = objects.application;
    var domain       = objects.domain;
    var organization = objects.organization;
    var route        = objects.route;
    var space        = objects.space;

    this.addJSONDetailsLinkRow(table, "GUID", Format.formatString(app_route.guid), objects, true);
    this.addPropertyRow(table, "Created", Format.formatDateString(app_route.created_at));
    this.addRowIfValue(this.addPropertyRow, table, "Updated", Format.formatDateString, app_route.updated_at);

    if ((route != null) && (row[6] != null))
    {
        if ((route.port != null) && (route.port !== 0))
        {
            this.addPropertyRow(table, "URI", Format.formatString(row[6]));
        }
        else
        {
            this.addURIRow(table, "URI", row[6]);
        }
    }

    if (application != null)
    {
        this.addFilterRow(table, "Application", Format.formatStringCleansed(application.name), application.guid, AdminUI.showApplications);
        this.addPropertyRow(table, "Application GUID", Format.formatString(application.guid));
    }

    this.addRowIfValue(this.addPropertyRow, table, "Application Port", Format.formatNumber, app_route.application_port);

    if (route != null)
    {
        this.addFilterRow(table, "Route GUID", Format.formatString(route.guid), route.guid, AdminUI.showRoutes);
    }

    if (domain != null)
    {
        this.addFilterRow(table, "Domain", Format.formatStringCleansed(domain.name), domain.guid, AdminUI.showDomains);
        this.addPropertyRow(table, "Domain GUID", Format.formatString(domain.guid));
    }

    if (space != null)
    {
        this.addFilterRow(table, "Space", Format.formatStringCleansed(space.name), space.guid, AdminUI.showSpaces);
        this.addPropertyRow(table, "Space GUID", Format.formatString(space.guid));
    }

    if (organization != null)
    {
        this.addFilterRow(table, "Organization", Format.formatStringCleansed(organization.name), organization.guid, AdminUI.showOrganizations);
        this.addPropertyRow(table, "Organization GUID", Format.formatString(organization.guid));
    }
};