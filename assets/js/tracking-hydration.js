(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const startTime = Date.now();
    const params = new URLSearchParams(window.location.search);

    const byId = (id) => document.getElementById(id);
    const setValue = (id, value) => {
      const el = byId(id);
      if (el) el.value = value ?? '';
    };

    const hydrateParam = (paramName, fieldId = paramName) => {
      if (params.has(paramName)) setValue(fieldId, params.get(paramName));
    };

    [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'utm_id',
      'gclid',
      'gbraid',
      'wbraid',
      'fbclid',
      'msclkid',
      'li_fat_id',
      'ttclid'
    ].forEach((param) => hydrateParam(param));

    const canonicalUrl = window.location.href.split('#')[0];
    setValue('landing_url', canonicalUrl);

    const referrer = document.referrer && document.referrer.trim()
      ? document.referrer
      : 'https://trafico-directo.capacita.cl';
    setValue('referente', referrer);
    setValue('zf_referrer_name', referrer);

    setValue('user_agent', navigator.userAgent.substring(0, 255));
    setValue('page_title', document.title || '');
    setValue('user_language', navigator.language || '');

    try {
      setValue('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone || 'Desconocida');
    } catch (_error) {
      setValue('timezone', 'Desconocida');
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setValue('dispositivo', isMobile ? 'Mobile' : 'Desktop');

    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(now.getDate()).padStart(2, '0');
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    setValue('capture_date', `${day}-${month}-${year}`);
    setValue('capture_hours', String(hours).padStart(2, '0'));
    setValue('capture_minutes', minutes);
    setValue('capture_meridiem', meridiem);

    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return '';
    };

    const gaCookie = getCookie('_ga');
    if (gaCookie) {
      const gaParts = gaCookie.split('.');
      if (gaParts.length >= 4) setValue('client_id', `${gaParts[2]}.${gaParts[3]}`);
    }

    const sessionMatch = document.cookie.match(/_ga_[A-Z0-9]+=GS\d\.\d\.([^.]+)/);
    if (sessionMatch && sessionMatch[1]) setValue('session_id', sessionMatch[1]);

    if (byId('lead_event_id')) {
      setValue('lead_event_id', `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`);
    }

    const hydrateSubmitTime = (formId, fieldId) => {
      const form = byId(formId);
      if (!form || !byId(fieldId)) return;
      form.addEventListener('submit', () => {
        setValue(fieldId, String(Math.floor((Date.now() - startTime) / 1000)));
      });
    };

    hydrateSubmitTime('zoho-native-form', 'tiempo_pagina');
    hydrateSubmitTime('form_dl', 'dl_tiempo_pagina');
  });
})();
