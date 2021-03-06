if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(
        (reg) => { console.log('SW registered!') },
        (err) => { console.log('SW not registered!', err) }
    )
}

function generateManifest(app_name) {
    const myDynamicManifest = {
        "name": "ЕГЭ",
        "short_name": "ЕГЭ",
        "scope": window.location.href,
        "start_url": window.location.href,
        "display": "fullscreen",
        "icons": [
            {
                "src":"https://publishwork1.github.io/ege48.png",
                "sizes": "48x48",
                "type": "image/png"
            },
            {
                "src": "https://publishwork1.github.io/ege144.png",
                "sizes": "144x144",
                "type": "image/png"
            },
            {
                "src": "https://publishwork1.github.io/ege196.png",
                "sizes": "196x196",
                "type": "image/png"
            }
        ]
    };
    if (app_name) {
        myDynamicManifest.name = app_name
    }
    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], {type: 'application/json'});
    const manifestURL = URL.createObjectURL(blob);
    document.querySelector('#custom-manifest').setAttribute('href', manifestURL);
}

generateManifest();

window.addEventListener('DOMContentLoaded', () => {
    const setAppNameBtn = document.querySelector('#set_app_name');
    const addAppToDesktopBtn = document.querySelector('#add_app_to_desktop');
    const input = document.querySelector('#app_name');

    setAppNameBtn.addEventListener('click', (e) => {
        generateManifest(input.value);
    });
    addAppToDesktopBtn.addEventListener('click', (e) => {
        promptEvent.prompt();
    });
});
let promptEvent;
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    console.log(event);
    promptEvent = event;
});