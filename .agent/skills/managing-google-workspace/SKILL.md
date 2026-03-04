---
name: managing-google-workspace
description: >
  Google Workspace CLI via gog for Gmail, Calendar, Drive, Contacts, Sheets, and Docs.
  Use when the user needs to send email, search Gmail, manage calendar events, access
  Google Drive, read/write Sheets, export Docs, or work with Google Contacts.
  Requires the gog CLI and OAuth credentials.
---

# Google Workspace (gog CLI)

Use `gog` to interact with Gmail, Calendar, Drive, Contacts, Sheets, and Docs from the command line.

## When to use this skill

- User needs to send or search email (Gmail)
- User needs to view or create calendar events
- User needs to search or manage Google Drive files
- User needs to read/write Google Sheets data
- User needs to export or read Google Docs
- User needs to look up Google Contacts

## Prerequisites

Install `gog`:

```bash
brew install steipete/tap/gogcli
```

One-time OAuth setup:

```bash
gog auth credentials /path/to/client_secret.json
gog auth add you@gmail.com --services gmail,calendar,drive,contacts,sheets,docs
gog auth list
```

Set `GOG_ACCOUNT=you@gmail.com` to avoid repeating `--account` on every command.

## Gmail

```bash
gog gmail search 'newer_than:7d' --max 10
gog gmail send --to user@example.com --subject "Hi" --body "Hello"
```

**Important:** Always confirm with the user before sending email.

## Calendar

```bash
gog calendar events <calendarId> --from <iso> --to <iso>
```

**Important:** Always confirm with the user before creating events.

## Drive

```bash
gog drive search "query" --max 10
```

## Contacts

```bash
gog contacts list --max 20
```

## Sheets

```bash
# Read data
gog sheets get <sheetId> "Tab!A1:D10" --json

# Write data
gog sheets update <sheetId> "Tab!A1:B2" --values-json '[["A","B"],["1","2"]]' --input USER_ENTERED

# Append rows
gog sheets append <sheetId> "Tab!A:C" --values-json '[["x","y","z"]]' --insert INSERT_ROWS

# Clear range
gog sheets clear <sheetId> "Tab!A2:Z"

# Get sheet metadata
gog sheets metadata <sheetId> --json
```

Pass values via `--values-json` (recommended) or as inline rows.

## Docs

```bash
gog docs cat <docId>
gog docs export <docId> --format txt --out /tmp/doc.txt
```

Supports export/cat/copy. In-place edits require the Docs API directly (not available in gog).

## Tips

- For scripting, use `--json` and `--no-input`
- Always confirm before sending mail or creating events
- Homepage: https://gogcli.sh

## Attribution

Based on [steipete/gog](https://clawhub.ai/steipete/gog) from ClawHub.
