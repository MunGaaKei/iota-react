import "./ripple.scss";

const state = {
	enable: false,
	timeout: 500,
};

const useRipple = () => {
	if (state.enable) return;
	state.enable = true;

	document.addEventListener("mousedown", listener);
};

function listener(e: MouseEvent) {
	const target = e.target as HTMLElement;
	const parent = target.closest("[data-ripple]") as HTMLElement;

	if (!target || !parent) return;

	triggerRipple(parent, e);
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
        transition: all ${state.timeout / 1000}s;
    `;
	target.insertAdjacentElement("afterbegin", $box);
	target.offsetHeight;
	$ripple.classList.add("i-ripple-active");

	setTimeout(() => {
		$box.remove();
	}, state.timeout);
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
