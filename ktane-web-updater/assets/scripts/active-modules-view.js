function cleanupActiveModulesView() {
    var activeModulesTable = getActiveModulesTable();
    var tableRows = activeModulesTable.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    for (var x = rowCount - 1; x > 0; x--) {
        activeModulesTable.removeChild(tableRows[x]);
    }
}

function getActiveModulesTable() {
    return document.getElementById('modulesTable');
}

function showNewModule(moduleData) {
    var row = document.createElement('tr');

    var moduleNameCell = document.createElement('td');
    appendTextNode(moduleNameCell, moduleData.name);
    row.appendChild(moduleNameCell);

    var urlCell = document.createElement('td');
    appendTextNode(urlCell, moduleData.url);
    row.appendChild(urlCell);

    var currentVersionCell = document.createElement('td');
    appendTextNode(currentVersionCell, versionToString(moduleData.currentVersion));
    row.appendChild(currentVersionCell);

    var updateCell = document.createElement('td');
    if (moduleData.canUpdate) {
        appendButton(updateCell, 'Update to ' + versionToString(moduleData.latestVersion), function () {
            updateModule(moduleData);
        });
    } else {
        appendTextNode(updateCell, 'NOT AVAILABLE');
    }
    row.appendChild(updateCell);

    getActiveModulesTable().appendChild(row);
}


function appendTextNode(parent, text) {
    var textNode = document.createTextNode(text);
    parent.appendChild(textNode);
}

function appendButton(parent, btnText, onClick) {
    var button = document.createElement("button");
    button.innerHTML = btnText;

    button.addEventListener("click", function () {
        onClick();
    });

    parent.appendChild(button);

    return button;
}