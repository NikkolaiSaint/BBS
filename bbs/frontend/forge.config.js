module.exports = {
    packagerConfig: {
        name: "BBS",
        executableName: "BBS",
        asar: true,
        icon: "./assets/bbs"
    },

    makers: [
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"]
        }
    ],

    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "NikkolaiSaint",
                    name: "BBS"
                }
            }
        }
    ]
};