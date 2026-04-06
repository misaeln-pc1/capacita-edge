interface Env {
  LANDING_CONFIGS: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const landingKey = String(context.params.landing_key || "").trim();

    if (!landingKey) {
      return new Response(
        JSON.stringify({ ok: false, error: "Falta landing_key" }),
        {
          status: 400,
          headers: { "content-type": "application/json" }
        }
      );
    }

    const key = `landing:${landingKey}`;
    const raw = await context.env.LANDING_CONFIGS.get(key);

    if (!raw) {
      return new Response(
        JSON.stringify({ ok: false, error: "No existe configuración publicada" }),
        {
          status: 404,
          headers: { "content-type": "application/json" }
        }
      );
    }

    return new Response(raw, {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=60"
      }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error?.message || "Error interno"
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" }
      }
    );
  }
};