function fillModuleVersionData(moduleData) {
    //todo
    moduleData.latestVersion = getLatestVersion(moduleData.id);
    moduleData.canUpdate = isGreater(moduleData.latestVersion, moduleData.currentVersion);
}

function getLatestVersion(moduleId) {
    //todo
    return stringToVersion("2.0.1");
}

function updateModule(moduleData) {
    console.log("update module " + moduleData.name + " to version " + versionToString(moduleData.latestVersion));
}

function versionToString(version) {
    return version.join('.');
}

function stringToVersion(strVersion) {
    return strVersion.split('.');
}

function isGreater(version1, version2) {
    for (var i = 0; i < version1.length; i++) {
        if (version1[i] > version2[i]) return true;
    }

    return false;
}

function getUpdateFileURL(moduleId, version) {
    let filePath = './update_files/' + moduleId + '/' + moduleId + '_' + version + '.bin';

    console.log(filePath);

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", filePath, false);
    xmlHttp.send();
    return (xmlHttp.status === 200) ? xmlHttp.responseURL : null;
}