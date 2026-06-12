(function ($) {
  "use strict";

  const apiEndpoint =
    window.location.protocol === "file:"
      ? "http://localhost:5000/api/contact"
      : "/api/contact";

  const $window = $(window);
  const $navbar = $(".navbar-glass");
  const $navLinks = $(".navbar-nav .nav-link, .nav-cta, .footer-section li a[href^='#'], .hero-actions a");
  const $contactForm = $("#contactForm");
  const $formAlert = $("#formAlert");

  function setCurrentYear() {
    $("#year").text(new Date().getFullYear());
  }

  function updateNavbarState() {
    $navbar.toggleClass("is-scrolled", $window.scrollTop() > 20);
  }

  function closeMobileMenu() {
    const menu = document.getElementById("navbarMenu");

    if (menu && menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  }

  function smoothScrollTo(hash) {
    const target = document.querySelector(hash);

    if (!target) {
      return;
    }

    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight + 2;

    window.scrollTo({
      top,
      behavior: "smooth"
    });
  }

  function setupSmoothScrolling() {
    $navLinks.on("click", function (event) {
      const hash = this.hash;

      if (!hash || !document.querySelector(hash)) {
        return;
      }

      event.preventDefault();
      closeMobileMenu();
      smoothScrollTo(hash);
      history.pushState(null, "", hash);
    });
  }

  function setupActiveNavigation() {
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".navbar-nav .nav-link");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const activeId = entry.target.getAttribute("id");

          navItems.forEach((item) => {
            item.classList.toggle("active", item.getAttribute("href") === `#${activeId}`);
          });
        });
      },
      {
        rootMargin: "-42% 0px -50% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function setupRevealAnimations() {
    const revealItems = document.querySelectorAll(".reveal");

    revealItems.forEach((item) => {
      const delay = item.getAttribute("data-delay");

      if (delay) {
        item.style.setProperty("--delay", `${delay}ms`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  function animateCounter(counter) {
    const $counter = $(counter);
    const target = Number($counter.data("target"));
    const decimals = Number($counter.data("decimals") || 0);
    const duration = 1400;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = target * easedProgress;

      $counter.text(value.toFixed(decimals));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        $counter.text(target.toFixed(decimals));
      }
    }

    requestAnimationFrame(updateCounter);
  }

  function setupCounters() {
    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.7
      }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function showFormAlert(type, message) {
    $formAlert
      .removeClass("success error")
      .addClass(type)
      .text(message)
      .fadeIn(160);
  }

  function clearFormAlert() {
    $formAlert.removeClass("success error").hide().text("");
  }

  function getFormData() {
    return {
      name: $("#name").val().trim(),
      companyName: $("#companyName").val().trim(),
      email: $("#email").val().trim(),
      phone: $("#phone").val().trim(),
      serviceNeeded: $("#serviceNeeded").val(),
      projectBrief: $("#projectBrief").val().trim()
    };
  }

  function validateForm(data) {
    if (!data.name) {
      return "Please enter your name.";
    }

    if (!data.email) {
      return "Please enter your email address.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return "Please enter a valid email address.";
    }

    if (!data.serviceNeeded) {
      return "Please choose the service you need.";
    }

    return "";
  }

  function setupContactForm() {
    $contactForm.on("submit", function (event) {
      event.preventDefault();
      clearFormAlert();

      const payload = getFormData();
      const validationMessage = validateForm(payload);

      if (validationMessage) {
        showFormAlert("error", validationMessage);
        return;
      }

      $contactForm.addClass("is-submitting");
      $contactForm.find("button[type='submit']").prop("disabled", true);

      $.ajax({
        url: apiEndpoint,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        timeout: 12000
      })
        .done(function (response) {
          showFormAlert(
            "success",
            response.message || "Your inquiry has been sent. The ExonClouds team will contact you soon."
          );
          $contactForm[0].reset();
        })
        .fail(function (xhr) {
          const response = xhr.responseJSON;
          const message =
            response && response.message
              ? response.message
              : "Unable to send your inquiry right now. Please try again shortly.";

          showFormAlert("error", message);
        })
        .always(function () {
          $contactForm.removeClass("is-submitting");
          $contactForm.find("button[type='submit']").prop("disabled", false);
        });
    });
  }

  $(function () {
    setCurrentYear();
    updateNavbarState();
    setupSmoothScrolling();
    setupActiveNavigation();
    setupRevealAnimations();
    setupCounters();
    setupContactForm();

    $window.on("scroll", updateNavbarState);
  });
})(jQuery);
