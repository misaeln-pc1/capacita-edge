interface Env {
  LANDING_CONFIGS: KVNamespace;
  PUBLISH_TOKEN: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const token = context.request.headers.get("x-publish-token");
    const expected = context.env.PUBLISH_TOKEN;

    if (!token || token !== expected) {
      return new Response(
        JSON.stringify({ ok: false, error: "Unauthorized" }),
        {
          status: 401,
          headers: { "content-type": "application/json" }
        }
      );
    }

    const payload = await context.request.json<any>();

    if (!payload || typeof payload !== "object") {
      return new Response(
        JSON.stringify({ ok: false, error: "Payload inválido" }),
        {
          status: 400,
          headers: { "content-type": "application/json" }
        }
      );
    }

    const landingKey = String(payload.landing_key || "").trim();
    const identity = payload.identity || {};
    const offerings = Array.isArray(payload.offerings) ? payload.offerings : [];

    if (!landingKey) {
      return new Response(
        JSON.stringify({ ok: false, error: "Falta landing_key" }),
        {
          status: 400,
          headers: { "content-type": "application/json" }
        }
      );
    }

    if (
      !identity.title ||
      !identity.modality ||
      !identity.duration ||
      !identity.location
    ) {
      return new Response(
        JSON.stringify({ ok: false, error: "Identity incompleta" }),
        {
          status: 400,
          headers: { "content-type": "application/json" }
        }
      );
    }

    if (offerings.length === 0) {
      return new Response(
        JSON.stringify({ ok: false, error: "offerings vacío" }),
        {
          status: 400,
          headers: { "content-type": "application/json" }
        }
      );
    }

    const seen = new Set<string>();

    for (const offer of offerings) {
      const slotKey = String(offer.slot_key || "").trim();

      if (
        !slotKey ||
        !offer.slot_label ||
        !offer.days ||
        !offer.time ||
        !offer.start ||
        offer.seats === undefined ||
        offer.sort_order === undefined
      ) {
        return new Response(
          JSON.stringify({ ok: false, error: "Offering incompleto" }),
          {
            status: 400,
            headers: { "content-type": "application/json" }
          }
        );
      }

      if (seen.has(slotKey)) {
        return new Response(
          JSON.stringify({ ok: false, error: "slot_key duplicado" }),
          {
            status: 400,
            headers: { "content-type": "application/json" }
          }
        );
      }

      seen.add(slotKey);
    }

    const key = `landing:${landingKey}`;

    await context.env.LANDING_CONFIGS.put(key, JSON.stringify(payload));

    return new Response(
      JSON.stringify({ ok: true, key }),
      {
        status: 200,
        headers: { "content-type": "application/json" }
      }
    );
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