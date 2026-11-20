# mycodespace-site

The landing page for **MyCodeSpace** at https://mycodespace.ai/ (and
https://www.mycodespace.ai/): a small English static site that introduces
[DevCapsule](https://devcapsule.mycodespace.ai/) as the first product.

## Layout

- [`site/`](site/README.md): the Astro project, its content, and its
  deployment wrapper (`site/scripts/`). The site guide covers local
  development (port 4329), the page's design notes, and hosting.
- `scripts/gcs/`: the build-and-upload script the wrapper calls, and its
  helpers.
- `engineering-docs/`: requirements, work orders and other records.

## Quick start

```bash
cd site
npm ci
npm run dev                 # http://localhost:4329
npm run build               # static files in site/dist/
npm run deploy -- plan      # prints the publishing targets; changes nothing
npm run deploy -- update    # builds and publishes to the live bucket
```

Publishing needs `gcloud` signed in to an account that can write the site's
bucket; see [`WORKFLOW-LOCAL.md`](WORKFLOW-LOCAL.md) and the
[site guide](site/README.md#gcs-deployment).

## Origin

The site was developed in `ccozianu/devcapsule-chessclub-website` (directory
`mycodespace-site/`) and moved here on 2026-11-20 without its history. The
earlier delivery records stay in that repository under
`engineering-docs/archive/2026-11-01-mycodespace-*`.

## Project records

- Requirements register: [`REQUIREMENTS.md`](REQUIREMENTS.md)
- Documentation index: [`index.md`](index.md)
- Live status and the next resumable task: [`CURRENT-STATUS.md`](CURRENT-STATUS.md)
