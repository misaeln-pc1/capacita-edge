addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  const rawPath = url.pathname
  const path = rawPath.endsWith('/') && rawPath !== '/'
    ? rawPath.slice(0, -1)
    : rawPath

  const EDGE_URL = 'https://capacita-edge.pages.dev'

  // 1) Canonicalización del slash final solo para rutas públicas finales
  const CANONICAL_PUBLIC_PATHS = new Set([
    '/curso-de-excel-presencial-en-santiago',
    '/curso-de-excel-basico-intermedio-online-sincronico',
    '/cursos-para-empresas',
    '/curso-empresa-excel',
    // '/curso-power-bi-basico-intermedio-online-sincronico',
    '/sitemap_index.xml',
    '/sitemap-estatico.xml'
  ])

  if (rawPath !== path && CANONICAL_PUBLIC_PATHS.has(path)) {
    const targetUrl = new URL(path, url.origin)
    targetUrl.search = url.search
    return Response.redirect(targetUrl.toString(), 301)
  }

  // 2) Redirects 301 de rutas antiguas / técnicas a rutas públicas canónicas
  const REDIRECTS_301 = {
    '/landing-empresas-excel': '/curso-empresa-excel',
    '/landing-empresas-excel.html': '/curso-empresa-excel',
    
    '/landing-empresas': '/cursos-para-empresas',
    '/landing-empresas.html': '/cursos-para-empresas',

    '/landing-excel': '/curso-de-excel-presencial-en-santiago',
    '/landing-excel.html': '/curso-de-excel-presencial-en-santiago',

    '/landing-excel12-presencial': '/curso-de-excel-presencial-en-santiago',
    '/landing-excel12-elearning': '/curso-de-excel-basico-intermedio-online-sincronico',

   // '/landing-powerbi12-elearning': '/curso-power-bi-basico-intermedio-online-sincronico',
   // '/landing-powerbi12-elearning.html': '/curso-power-bi-basico-intermedio-online-sincronico',

  }

  if (REDIRECTS_301[path]) {
    const targetUrl = new URL(REDIRECTS_301[path], url.origin)
    targetUrl.search = url.search
    return Response.redirect(targetUrl.toString(), 301)
  }

  // 3) ÚNICAS rutas HTML públicas servidas desde Cloudflare Pages
  const HTML_ROUTES = {
    '/curso-de-excel-presencial-en-santiago': `${EDGE_URL}/landing-excel12-presencial`,
    '/curso-de-excel-basico-intermedio-online-sincronico': `${EDGE_URL}/landing-excel12-elearning`,
    '/cursos-para-empresas': `${EDGE_URL}/landing-empresas`,
    '/curso-empresa-excel': `${EDGE_URL}/landing-empresas-excel.html`,
   // '/curso-power-bi-basico-intermedio-online-sincronico': `${EDGE_URL}/landing-powerbi12-elearning.html`
  }

  // 4) XML / sitemaps
  const XML_ROUTES = {
    '/sitemap_index.xml': `${EDGE_URL}/sitemap_index.xml`,
    '/sitemap-estatico.xml': `${EDGE_URL}/sitemap-estatico.xml`
  }

  // 5) Servir HTML desde Pages
  if (HTML_ROUTES[path]) {
    try {
      const response = await fetch(HTML_ROUTES[path], {
        method: 'GET',
        redirect: 'follow',
        cache: 'no-store'
      })

      const out = new Response(response.body, response)
      out.headers.set('content-type', 'text/html;charset=UTF-8')
      return out
    } catch (e) {
      return fetch(request)
    }
  }

  // 6) Servir XML desde Pages
  if (XML_ROUTES[path]) {
    try {
      const response = await fetch(XML_ROUTES[path], {
        method: 'GET',
        redirect: 'follow',
        cache: 'no-store'
      })

      const out = new Response(response.body, response)
      out.headers.set('content-type', 'text/xml;charset=UTF-8')
      return out
    } catch (e) {
      return fetch(request)
    }
  }

  // 7) Proxy del formulario principal seguro
  if (path === '/api/forms/lead') {
    const proxyRequest = new Request(`${EDGE_URL}/api/forms/lead`, request)
    return fetch(proxyRequest)
  }

  // 8) Proxy del formulario de descarga
  if (path === '/api/forms/download') {
    const proxyRequest = new Request(`${EDGE_URL}/api/forms/download`, request)
    return fetch(proxyRequest)
  }

  // 9) Proxy de config dinámica de landing
  if (path.startsWith('/api/landing-config/')) {
    const proxyRequest = new Request(`${EDGE_URL}${url.pathname}${url.search}`, request)
    return fetch(proxyRequest)
  }

  // 10) Todo lo demás sigue yendo al origen (WordPress)
  return fetch(request)
}
