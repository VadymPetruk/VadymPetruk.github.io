var foundModules = [];

function cleanupActiveModules() {
    foundModules = [];
    cleanupActiveModulesView();
}

function updateActiveModules() {
    cleanupActiveModules();
    searchModules(function (moduleData) {
        fillModuleVersionData(moduleData);
        showNewModule(moduleData);
    });
}

function searchModules(onModuleFound) {
    const http = new XMLHttpRequest();

    const mainModuleURL = document.getElementById('main-module-url-input').value;
    pingModuleUrl(mainModuleURL);

    function pingModuleUrl(urlToPing) {
        pingUrl(urlToPing + '/ktane/data', function (response) {
            const responseText = response.currentTarget.responseText;
            if (responseText && foundModules.indexOf(urlToPing) === -1) {
                foundModules.push(urlToPing);
                onModuleFound(
                    createModuleData(urlToPing, responseText)
                );
            }
        })
    }

    function pingUrl(url, onSuccess) {
        http.open("GET", url);
        http.send();
        http.onreadystatechange = onSuccess;
    }

    function createModuleData(moduleUrl, responseText) {
        const responseJson = JSON.parse(responseText);
        return {
            url: moduleUrl,
            id: responseJson.id,
            name: responseJson.name,
            currentVersion: stringToVersion(responseJson.version),
            latestVersion: null,
            canUpdate: null
        };
    }
}