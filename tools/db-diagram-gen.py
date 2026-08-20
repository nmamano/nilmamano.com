#!/usr/bin/env python3
"""Generate a dbdiagram.io-style ER diagram for the Hosted Isomux control-plane schema.

Output: public/blog/hosted-isomux/db-diagram.svg (used by blog/hosted-isomux.mdx).
Run: python3 tools/db-diagram-gen.py

The tables below are TRANSCRIBED BY HAND from the SCHEMA constant in
~/nil/isomux/control-plane/store.ts, and abridged: the long tables keep only
the columns the post discusses. They can drift from the real schema; re-check
against store.ts before trusting the diagram after a schema change.
"""

W, H = 1164, 812
BG = "#3f4348"
CARD = "#4b4f55"
HEAD = "#2c3036"
TXT = "#eef0f3"
TYPE = "#b9bfc7"
BADGE = "#71777f"
LINE = "#9aa1aa"
GROUP = "#ffffff"

ROW_H = 21
HEAD_H = 27
PAD = 7
CARD_W = 200


def T(name, cols):
    return {"name": name, "cols": cols}


# (column, type, pk?, nn?)
TABLES = {
    "accounts": T("accounts", [
        ("id", "text", 1, 1), ("email", "text", 0, 1),
        ("google_subject", "text", 0, 0), ("stripe_customer_id", "text", 0, 0),
        ("is_operator", "integer", 0, 1), ("version", "integer", 0, 1),
    ]),
    "name_reservations": T("name_reservations", [
        ("name", "text", 1, 1), ("id", "text", 0, 1),
        ("account_id", "text", 0, 1), ("instance_id", "text", 0, 1),
        ("plan", "text", 0, 1), ("coupon_id", "text", 0, 0),
    ]),
    "subscriptions": T("subscriptions", [
        ("id", "text", 1, 1), ("account_id", "text", 0, 1),
        ("instance_id", "text", 0, 0), ("status", "text", 0, 1),
        ("current_period_end", "bigint", 0, 0), ("cancel_at_period_end", "integer", 0, 1),
        ("ended_at", "bigint", 0, 0), ("cancellation_reason", "text", 0, 0),
        ("discount_percent_off", "integer", 0, 0), ("ever_full_discount", "integer", 0, 1),
        ("payment_failures", "integer", 0, 1), ("episode_state", "text", 0, 1),
    ]),
    "stripe_events": T("stripe_events", [
        ("id", "text", 1, 1), ("type", "text", 0, 1),
        ("created", "bigint", 0, 1), ("subscription_id", "text", 0, 0),
        ("outcome", "text", 0, 1),
    ]),
    "reinstatement_attempts": T("reinstatement_attempts", [
        ("id", "text", 1, 1), ("account_id", "text", 0, 1),
        ("instance_id", "text", 0, 1), ("closed_subscription_id", "text", 0, 1),
        ("new_subscription_id", "text", 0, 0), ("checkout_session_id", "text", 0, 0),
        ("fence_expires_at", "bigint", 0, 1), ("state", "text", 0, 1),
    ]),
    "instances": T("instances", [
        ("id", "text", 1, 1), ("run_id", "text", 0, 0),
        ("name", "text", 0, 1), ("plan", "text", 0, 1),
        ("service_state", "text", 0, 1), ("goal", "text", 0, 1),
        ("subscription_state", "text", 0, 1), ("attention_state", "text", 0, 1),
        ("access_window_expires_at", "bigint", 0, 0), ("customer_ssh_key", "text", 0, 0),
        ("version", "integer", 0, 1),
    ]),
    "instance_liveness": T("instance_liveness", [
        ("instance_id", "text", 1, 1), ("rung", "text", 0, 1),
        ("strikes", "integer", 0, 1), ("next_check_at", "bigint", 0, 1),
        ("claim_until", "bigint", 0, 0),
    ]),
    "certificate_credentials": T("certificate_credentials", [
        ("id", "text", 1, 1), ("instance_id", "text", 0, 1),
        ("token_hash", "text", 0, 1), ("status", "text", 0, 1),
        ("last_used_at", "bigint", 0, 0),
    ]),
    "operations": T("operations", [
        ("id", "text", 1, 1), ("instance_id", "text", 0, 1),
        ("kind", "text", 0, 1), ("status", "text", 0, 1),
        ("attempt", "integer", 0, 1), ("next_attempt_at", "bigint", 0, 1),
        ("lease_until", "bigint", 0, 0), ("lease_holder", "text", 0, 0),
        ("inactivity_deadline_at", "bigint", 0, 1), ("absolute_deadline_at", "bigint", 0, 1),
        ("evidence", "text", 0, 1), ("version", "integer", 0, 1),
    ]),
    "create_intents": T("create_intents", [
        ("intent_id", "text", 1, 1), ("state", "text", 0, 1),
        ("latched_at", "bigint", 0, 1), ("plan", "text", 0, 1),
        ("provider_id", "text", 0, 0), ("reason", "text", 0, 0),
    ]),
    "provider_assets": T("provider_assets", [
        ("id", "text", 1, 1), ("instance_id", "text", 0, 1),
        ("provider", "text", 0, 1), ("provider_id", "text", 0, 0),
        ("intent_id", "text", 0, 0), ("asset_state", "text", 0, 1),
        ("ipv4", "text", 0, 0), ("service_ends_at", "text", 0, 0),
        ("next_reconcile_at", "bigint", 0, 1),
    ]),
    "attention_reasons": T("attention_reasons", [
        ("id", "text", 1, 1), ("instance_id", "text", 0, 1),
        ("source_op_id", "text", 0, 1), ("reason_class", "text", 0, 1),
        ("severity", "text", 0, 1), ("raised_at", "bigint", 0, 1),
        ("cleared_at", "bigint", 0, 0), ("acknowledged_at", "bigint", 0, 0),
    ]),
    "audit_events": T("audit_events", [
        ("seq", "bigint", 1, 1), ("ts", "bigint", 0, 1),
        ("actor", "text", 0, 1), ("instance_id", "text", 0, 0),
        ("action", "text", 0, 1), ("outcome", "text", 0, 1),
    ]),
    "schema_meta": T("schema_meta", [("key", "text", 1, 1), ("value", "text", 0, 1)]),
    "sequences": T("sequences", [("name", "text", 1, 1), ("value", "bigint", 0, 1)]),
}

# column x, starting y, table order
LAYOUT = [
    (30, 78, ["accounts", "name_reservations", "GAP60", "schema_meta", "sequences"]),
    (256, 78, ["subscriptions", "stripe_events", "reinstatement_attempts"]),
    (482, 78, ["instances", "instance_liveness", "certificate_credentials"]),
    (708, 78, ["operations", "create_intents", "attention_reasons"]),
    (934, 78, ["provider_assets", "audit_events"]),
]

GROUPS = [
    ("Accounts &amp; signup", ["accounts", "name_reservations"]),
    ("Bookkeeping", ["schema_meta", "sequences"]),
    ("Billing", ["subscriptions", "stripe_events", "reinstatement_attempts"]),
    ("The office", ["instances", "instance_liveness", "certificate_credentials"]),
    ("Provisioning", ["operations", "create_intents", "attention_reasons",
                      "provider_assets", "audit_events"]),
]

pos = {}
out = []
out.append(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
    f'font-family="Inter, -apple-system, \'Segoe UI\', Helvetica, Arial, sans-serif">'
)
out.append(f'<rect width="{W}" height="{H}" fill="{BG}"/>')

edges_from = {}

for cx, cy, names in LAYOUT:
    y = cy
    for n in names:
        if n.startswith("GAP"):
            y += int(n[3:])
            continue
        t = TABLES[n]
        h = HEAD_H + len(t["cols"]) * ROW_H + PAD
        pos[n] = (cx, y, CARD_W, h)
        out.append(
            f'<rect x="{cx}" y="{y}" width="{CARD_W}" height="{h}" rx="4" fill="{CARD}"/>'
        )
        out.append(
            f'<path d="M {cx} {y + 4} a 4 4 0 0 1 4 -4 h {CARD_W - 8} a 4 4 0 0 1 4 4 '
            f'v {HEAD_H - 4} h -{CARD_W} z" fill="{HEAD}"/>'
        )
        out.append(
            f'<text x="{cx + 10}" y="{y + 18.5}" font-size="12.5" font-weight="700" '
            f'fill="{TXT}">{t["name"]}</text>'
        )
        ry = y + HEAD_H
        for (col, typ, pk, nn) in t["cols"]:
            ty = ry + 14.5
            weight = "700" if pk else "400"
            marker = (
                f'<tspan dx="5" font-size="9" font-weight="400" fill="{TYPE}">&#9675;</tspan>'
                if pk else ""
            )
            out.append(
                f'<text x="{cx + 10}" y="{ty}" font-size="11" font-weight="{weight}" '
                f'fill="{TXT}">{col}{marker}</text>'
            )
            badge_w = 17 if nn else 0
            out.append(
                f'<text x="{cx + CARD_W - 10 - badge_w}" y="{ty}" font-size="10.5" '
                f'text-anchor="end" fill="{TYPE}">{typ}</text>'
            )
            if nn:
                out.append(
                    f'<rect x="{cx + CARD_W - 27}" y="{ty - 9}" width="19" height="12" '
                    f'rx="2" fill="{BADGE}"/>'
                )
                out.append(
                    f'<text x="{cx + CARD_W - 17.5}" y="{ty - 0.5}" font-size="8" '
                    f'font-weight="700" text-anchor="middle" fill="{TXT}">NN</text>'
                )
            edges_from[(n, col)] = (cx, ry + ROW_H / 2)
            ry += ROW_H
        y += h + 26

# group frames, computed from the cards they contain
frames = []
for label, members in GROUPS:
    xs = [pos[m][0] for m in members]
    ys = [pos[m][1] for m in members]
    x2s = [pos[m][0] + pos[m][2] for m in members]
    y2s = [pos[m][1] + pos[m][3] for m in members]
    gx, gy = min(xs) - 12, min(ys) - 12
    gw, gh = max(x2s) - gx + 12, max(y2s) - gy + 12
    frames.append(
        f'<rect x="{gx}" y="{gy}" width="{gw}" height="{gh}" rx="6" fill="none" '
        f'stroke="{GROUP}" stroke-width="1.2" stroke-opacity="0.8"/>'
        f'<text x="{gx + 4}" y="{gy - 9}" font-family="Georgia, serif" font-size="17" '
        f'fill="{GROUP}">{label}</text>'
    )
out = out[:2] + frames + out[2:]

# relations: (from_table, from_col, to_table, to_col)
REL = [
    ("name_reservations", "account_id", "accounts", "id"),
    ("subscriptions", "account_id", "accounts", "id"),
    ("reinstatement_attempts", "account_id", "accounts", "id"),
    ("stripe_events", "subscription_id", "subscriptions", "id"),
    ("reinstatement_attempts", "closed_subscription_id", "subscriptions", "id"),
    ("subscriptions", "instance_id", "instances", "id"),
    ("name_reservations", "instance_id", "instances", "id"),
    ("instance_liveness", "instance_id", "instances", "id"),
    ("certificate_credentials", "instance_id", "instances", "id"),
    ("operations", "instance_id", "instances", "id"),
    ("attention_reasons", "instance_id", "instances", "id"),
    ("provider_assets", "instance_id", "instances", "id"),
    ("audit_events", "instance_id", "instances", "id"),
    ("attention_reasons", "source_op_id", "operations", "id"),
    ("provider_assets", "intent_id", "create_intents", "intent_id"),
]

for (ft, fc, tt, tc) in REL:
    fx, fy = edges_from[(ft, fc)]
    tx, ty = edges_from[(tt, tc)]
    fcard = pos[ft]
    tcard = pos[tt]
    # exit each card on the side facing the other
    if fcard[0] < tcard[0]:
        x1, x2 = fcard[0] + CARD_W, tcard[0]
        d = 34
        path = f"M {x1} {fy} C {x1 + d} {fy}, {x2 - d} {ty}, {x2} {ty}"
    elif fcard[0] > tcard[0]:
        x1, x2 = fcard[0], tcard[0] + CARD_W
        d = 34
        path = f"M {x1} {fy} C {x1 - d} {fy}, {x2 + d} {ty}, {x2} {ty}"
    else:
        x1 = x2 = fcard[0]
        path = f"M {x1} {fy} C {x1 - 46} {fy}, {x2 - 46} {ty}, {x2} {ty}"
    out.append(
        f'<path d="{path}" fill="none" stroke="{LINE}" stroke-width="1.1" '
        f'stroke-opacity="0.75"/>'
    )
    out.append(f'<circle cx="{x2}" cy="{ty}" r="2.4" fill="{LINE}"/>')
    out.append(f'<circle cx="{x1}" cy="{fy}" r="2.4" fill="{LINE}"/>')

out.append("</svg>")
open("/home/nil/nil/nilmamano.com/public/blog/hosted-isomux/db-diagram.svg", "w").write(
    "\n".join(out)
)
print("ok")
