(function () {
  var S = window.SITE || {};

  // Brand name, contact details and other config-driven text
  document.querySelectorAll("[data-brand]").forEach(function (el) { el.textContent = S.name; });
  document.querySelectorAll("[data-tagline]").forEach(function (el) { el.textContent = S.tagline; });
  document.querySelectorAll("[data-offer]").forEach(function (el) { el.textContent = S.offer; });
  document.querySelectorAll("[data-areas]").forEach(function (el) { el.textContent = (S.areas || []).join(" · "); });
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  document.title = document.title.replace("{brand}", S.name);

  document.querySelectorAll("[data-phone]").forEach(function (el) {
    if (!S.phone) { el.hidden = true; return; }
    el.textContent = S.phone;
    el.href = "tel:" + S.phone.replace(/[^+\d]/g, "");
  });
  document.querySelectorAll("[data-email]").forEach(function (el) {
    if (!S.email) { el.hidden = true; return; }
    el.textContent = S.email;
    el.href = "mailto:" + S.email;
  });

  // Prices: "from $X" or a neutral fallback
  document.querySelectorAll("[data-price]").forEach(function (el) {
    var p = (S.prices || {})[el.getAttribute("data-price")];
    el.textContent = p ? "From $" + p : "Instant price online";
  });

  // Book buttons go to the booking page (or the booking tool directly if set)
  document.querySelectorAll("[data-book]").forEach(function (el) {
    el.href = S.bookingUrl && el.hasAttribute("data-book-direct") ? S.bookingUrl : "residential.html#book";
  });

  // Booking embed
  var embed = document.getElementById("booking-embed");
  if (embed) {
    if (S.bookingUrl) {
      var f = document.createElement("iframe");
      f.src = S.bookingUrl;
      f.title = "Book a cleaning";
      f.loading = "lazy";
      embed.innerHTML = "";
      embed.appendChild(f);
      embed.classList.add("is-live");
    }
  }

  // Google review button
  document.querySelectorAll("[data-review-link]").forEach(function (el) {
    if (!S.googleReviewUrl) { el.hidden = true; return; }
    el.href = S.googleReviewUrl;
  });

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  // Meta pixel
  if (S.metaPixelId) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", S.metaPixelId);
    fbq("track", "PageView");
  }
  function track(evt, data) { if (window.fbq) fbq("track", evt, data || {}); }

  document.querySelectorAll("[data-book]").forEach(function (el) {
    el.addEventListener("click", function () { track("InitiateCheckout"); });
  });

  // Commercial walkthrough form
  var form = document.getElementById("walkthrough-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var status = form.querySelector(".form-status");
      track("Lead", { content_name: "Commercial walkthrough" });

      if (S.formEndpoint) {
        status.textContent = "Sending...";
        fetch(S.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error();
            window.location.href = "thanks.html";
          })
          .catch(function () { status.textContent = "Something went wrong. Please call or email us instead."; });
      } else if (!S.email) {
        status.textContent = "Thanks! This form isn't connected yet, so nothing was sent.";
      } else {
        var lines = [];
        data.forEach(function (v, k) { lines.push(k + ": " + v); });
        window.location.href = "mailto:" + (S.email || "") +
          "?subject=" + encodeURIComponent("Walkthrough request: " + (data.get("company") || "")) +
          "&body=" + encodeURIComponent(lines.join("\n"));
      }
    });
  }
})();
