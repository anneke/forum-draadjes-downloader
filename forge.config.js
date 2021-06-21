module.exports = {
    makers: [
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin', 'linux'],
            config: {
                // Config here
            }
        },
        {
            name: '@electron-forge/maker-dmg',
            config: {
                background: './assets/dmg-background.png',
                format: 'ULFO'
            }
        },
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                certificateFile: './cert.pfx',
                certificatePassword: 'this-is-a-secret'
            }
        }
    ]
}
