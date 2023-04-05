import "./ripple.scss";

const TIMEOUT = 500;
let rippleEnable = false;

const useRipple = () => {
    if (rippleEnable) return;
    rippleEnable = true;

    document.addEventListener("mousedown", listener);
};

function listener(e: MouseEvent) {
    const target = e.target as Element;
    const parent = target.closest("[ripple]") as HTMLElement;

    if (target && parent) {
        triggerRipple(parent, e);
    }
}

function triggerRipple(target: HTMLElement, e: MouseEvent) {
    const [$box, $ripple] = createRipple();
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    $ripple.style.cssText = `
        left: ${e.pageX - rect.left}px;
        top: ${e.pageY - rect.top}px;
        width: ${size}px;
        height: ${size}px;
        transition: all ${TIMEOUT / 1000}s;
    `;
    target.insertAdjacentElement("afterbegin", $box);
    target.offsetHeight;
    $ripple.classList.add("i-ripple-active");

    setTimeout(() => {
        $box.remove();
    }, TIMEOUT);
}

function createRipple() {
    const $box = document.createElement("SPAN");
    const $ripple = document.createElement("SPAN");

    $box.className = "i-ripple-container";
    $ripple.className = "i-ripple";

    $box.append($ripple);

    return [$box, $ripple];
}

export default useRipple;
