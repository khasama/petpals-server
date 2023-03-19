const devtools = {
    isOpen: false,
    orientation: undefined,
};

const threshold = 160;

const emitEvent = (isOpen, orientation) => {
    globalThis.dispatchEvent(
        new globalThis.CustomEvent("devtoolschange", {
            detail: {
                isOpen,
                orientation,
            },
        })
    );
};

const main = ({ emitEvents = true } = {}) => {
    const widthThreshold =
        globalThis.outerWidth - globalThis.innerWidth > threshold;
    const heightThreshold =
        globalThis.outerHeight - globalThis.innerHeight > threshold;
    const orientation = widthThreshold ? "vertical" : "horizontal";

    if (
        !(heightThreshold && widthThreshold) &&
        ((globalThis.Firebug &&
            globalThis.Firebug.chrome &&
            globalThis.Firebug.chrome.isInitialized) ||
            widthThreshold ||
            heightThreshold)
    ) {
        if (
            (!devtools.isOpen || devtools.orientation !== orientation) &&
            emitEvents
        ) {
            emitEvent(true, orientation);
        }

        devtools.isOpen = true;
        devtools.orientation = orientation;
    } else {
        if (devtools.isOpen && emitEvents) {
            emitEvent(false, undefined);
        }

        devtools.isOpen = false;
        devtools.orientation = undefined;
    }
};

main({ emitEvents: false });
setInterval(main, 500);

function checkDevTools() {
    if (devtools.isOpen) {
        window.location.href = "https://www.google.com/";
    }

    window.addEventListener("devtoolschange", (event) => {
        if (event.detail.isOpen) {
            window.location.href = "https://www.google.com/";
        }
    });
}