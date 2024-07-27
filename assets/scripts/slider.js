function initSlider(slider){
    const imageList = slider.querySelector(".slider-wrapper .image-list");
    const slideButtons = slider.querySelectorAll(".slide-button");
    const sliderScrollbar = slider.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const imageItems = imageList.querySelectorAll(".image-item");
    const imageItemWidth = imageItems[0].clientWidth + 18; // 18 - gap between elements
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    if (imageItems.length <= 3) {
        sliderScrollbar.style.display = "none";
        sliderScrollbar.parentElement.style.justifyContent= "end"

    } else {
        sliderScrollbar.style.display = "flex";
        sliderScrollbar.parentElement.style.justifyContent= "space-between"
    }

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageItemWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    let isDragging = false;
    let startX;
    let scrollLeft;

    const startDragging = (e) => {
        isDragging = true;
        startX = e.pageX - imageList.offsetLeft;
        scrollLeft = imageList.scrollLeft;
    }

    const stopDragging = () => {
        isDragging = false;
    }

    const handleDragging = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - imageList.offsetLeft;
        const walk = (x - startX);
        imageList.scrollLeft = scrollLeft - walk;
    }

    imageList.addEventListener("mousedown", startDragging);
    imageList.addEventListener("mousemove", handleDragging);
    imageList.addEventListener("mouseup", stopDragging);
    imageList.addEventListener("mouseleave", stopDragging);

    imageList.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX - imageList.offsetLeft;
        scrollLeft = imageList.scrollLeft;
    });

    imageList.addEventListener("touchmove", (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - imageList.offsetLeft;
        const walk = (x - startX);
        imageList.scrollLeft = scrollLeft - walk;
    });

    imageList.addEventListener("touchend", () => {
        startX = null;
    });

    const handleSlideButtons = () => {
        const scrollLeft = imageList.scrollLeft;
        const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

        if (scrollLeft > 0) {
            slider.querySelector("#prev-slide").style.fill = "#182CC0";
        } else {
            slider.querySelector("#prev-slide").style.fill = "#555F62";
        }

        if (scrollLeft < maxScrollLeft) {
            slider.querySelector("#next-slide").style.fill = "#182CC0";
        } else {
            slider.querySelector("#next-slide").style.fill = "#555F62";
        }
    }

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

    handleSlideButtons();
}

const initAllSliders = () => {
    const sliders = document.querySelectorAll(".container");
    sliders.forEach(slider => {
        initSlider(slider);
    });
}

window.addEventListener("resize", initAllSliders);
window.addEventListener("load", initAllSliders);
