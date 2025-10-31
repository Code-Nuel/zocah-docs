---
slug: api
title: API Reference (v1)
---

import OpenApiEmbed from '@site/src/components/OpenApiEmbed';

# Zocah API (v1)

Zocah exposes a RESTful API to provision projects, generate dependency manifests, and manage builds/deployments. Put your API key in the `Authorization: Bearer <API_KEY>` header for protected endpoints.

> Full spec: the OpenAPI document is included at `/openapi.yml`. Use the interactive viewer below to explore all endpoints and schemas.

<OpenApiEmbed specUrl="/openapi.yml" />

---

## Quick endpoints (summary)

- **Create project** — `POST /projects`  
- **Generate dependencies** — `POST /projects/{id}/generate-deps`  
- **Deploy** — `POST /projects/{id}/deploy`  
- **Status** — `GET /projects/{id}/status`  
- **Logs** — `GET /projects/{id}/logs` (supports `since` query param)  
- **Integrations** — `GET /integrations`

---

## Example requests & responses

### Create project — `POST /projects`

**Request**
```bash
curl -X POST "https://api.zocah.com/v1/projects" \
  -H "Authorization: Bearer sk_test_xxx" \
  -H "Content-Type: application/json" \
  -d '{"name":"demo","template":"nextjs","language":"javascript"}'
