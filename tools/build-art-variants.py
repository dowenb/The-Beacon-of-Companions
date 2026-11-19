#!/usr/bin/env python3
"""Rebuild the party-aware SVG variants from the tagged base illustrations.

Run this after editing any of the base SVGs in assets/. It is a development
tool only; the game itself needs no build step and loads the generated files
directly.

Base illustrations are tagged with `data-party` attributes:
  pip      - Pip the fox (joins at 3 bonds)
  gorin    - Gorin the blacksmith (joins at 6 bonds)
  sable    - Sable the owl (joins at 9 bonds)
  friends  - generic travelling companions (present from 3 bonds)

Variants remove the groups that have not joined yet, strip the comments that
describe them, and give the scene an accurate aria-label.
"""

from pathlib import Path
import re

ASSETS = Path(__file__).resolve().parent.parent / "assets"

REMOVE = {
    "none": {"pip", "gorin", "sable", "friends"},
    "pip": {"gorin", "sable"},
    "pip-gorin": {"sable"},
    "pip-gorin-sable": set(),
}

COMMENT_KEYWORDS = {
    "pip": ("fox", "pip"),
    "gorin": ("blacksmith", "gorin"),
    "sable": ("owl", "sable"),
    "friends": ("companion", "helpers", "circle of cloaks", "hands", "shared cloak"),
}

# (base file, output suffix, party state, aria-label)
VARIANTS = [
    ("round-04", "-none", "none", "Villagers haul timber planks across a broken stone bridge while a wayfinder watches from the near bank"),
    ("round-05", "-none", "none", "A lone wayfinder chooses between a glowing mushroom trail and a dark straight path through the woods"),
    ("round-06", "-none", "none", "A stranded knight lies beneath a boulder on an empty mountain pass, with a solitary path onward"),
    ("round-07", "-none", "none", "A lone wayfinder faces the great beacon tower gate, weighing the iron wheel against a small side latch"),
    ("round-07", "-pip", "pip", "A wayfinder and their fox scout face the beacon tower gate, weighing the iron wheel against a small side latch"),
    ("round-08", "-none", "none", "A lone wayfinder climbs an exposed stair through a storm while a lantern glows in an empty shelter"),
    ("round-08", "-pip", "pip", "A wayfinder and their fox scout shelter beside a lantern in a storm while an exposed stair climbs into the rain"),
    ("round-09", "-none", "none", "A lone wayfinder races up the final spiral stair carrying the torch"),
    ("round-09", "-pip", "pip", "A wayfinder and their fox scout carry the torch up the final spiral stair"),
    ("round-10", "-none", "none", "A lone wayfinder holds the unlit torch in the cold beacon chamber above a sleeping valley"),
    ("round-10", "-pip", "pip", "A wayfinder and their fox scout stand at the railing of the cold beacon chamber"),
    ("round-10", "-pip-gorin", "pip-gorin", "A wayfinder with Pip and Gorin waits at the railing of the cold beacon chamber above a sleeping valley"),
    ("ending-friends", "-no-sable", "pip-gorin", "A joyful circle of friends celebrates around a blazing beacon as the valley rebuilds at sunrise"),
]


def tag_base_art():
    """Apply the data-party markers and scene fixes to the base SVGs once."""
    edits = {
        "round-04.svg": [
            ('<circle cx="652" cy="92" r="82" fill="url(#sun)"/>',
             '<circle cx="652" cy="92" r="54" fill="url(#sun)" opacity=".55"/>'),
            ('<circle cx="652" cy="92" r="34" fill="#fff3c8"/>',
             '<circle cx="652" cy="92" r="22" fill="#f7e7b4" opacity=".8"/>'),
            ('  <!-- fox scout checking the new planks from the left abutment -->\n  <g transform="translate(282 282)">',
             '  <!-- wayfinder on the near bank -->\n'
             '  <g transform="translate(180 300)"><ellipse cy="3" rx="16" ry="4" fill="#000" opacity=".2"/>'
             '<path d="M0-32 C10-32 15-14 17 0 L-17 0 C-15-14 -10-32 0-32Z" fill="#3f6079"/>'
             '<circle cx="0" cy="-38" r="7" fill="#d9a87e"/>'
             '<path d="M14-24 L32-32" stroke="#d9a87e" stroke-width="5" stroke-linecap="round"/></g>\n'
             '  <!-- Pip the fox scout checking the new planks -->\n'
             '  <g data-party="pip" transform="translate(282 282)">'),
        ],
        "round-05.svg": [
            ('  <!-- companions on winding path -->\n  <g transform="translate(420 372)">',
             '  <!-- companions on winding path -->\n  <g data-party="friends" transform="translate(420 372)">'),
            ('  <g transform="translate(470 356)">',
             '  <g data-party="friends" transform="translate(470 356)">'),
            ('  <g transform="translate(516 332)">',
             '  <g data-party="friends" transform="translate(516 332)">'),
            ('  <!-- fox scout ahead -->\n  <g transform="translate(556 286)">',
             '  <!-- Pip the fox scout ahead -->\n  <g data-party="pip" transform="translate(556 286)">'),
        ],
        "round-06.svg": [
            ('  <!-- helpers -->\n  <g transform="translate(120 372)">',
             '  <!-- helpers -->\n  <g data-party="friends" transform="translate(120 372)">'),
            ('  <g transform="translate(72 382)">',
             '  <g data-party="friends" transform="translate(72 382)">'),
            ('  <g transform="translate(366 372)">',
             '  <g data-party="friends" transform="translate(366 372)">'),
            ('  <!-- blacksmith with hammer -->\n  <g transform="translate(430 380)">',
             '  <!-- blacksmith with hammer -->\n  <g data-party="friends" transform="translate(430 380)">'),
        ],
        "round-07.svg": [
            ('    <g transform="translate(306 268)">',
             '    <g data-party="friends" transform="translate(306 268)">'),
            ('    <g transform="translate(494 268)">',
             '    <g data-party="friends" transform="translate(494 268)">'),
            ('    <g transform="translate(352 430)">',
             '    <g data-party="gorin" transform="translate(352 430)">'),
            ('  <!-- fox at the latch -->\n  <g transform="translate(566 316)">',
             '  <!-- Pip at the latch -->\n  <g data-party="pip" transform="translate(566 316)">'),
        ],
        "round-08.svg": [
            ('    <g transform="translate(120 370)">',
             '    <g data-party="friends" transform="translate(120 370)">'),
            ('    <g transform="translate(190 398)">',
             '    <g data-party="friends" transform="translate(190 398)">'),
            ('    <g transform="translate(268 370)">',
             '    <g data-party="friends" transform="translate(268 370)">'),
            ('    <g transform="translate(196 330)">',
             '    <g data-party="gorin" transform="translate(196 330)">'),
        ],
        "round-09.svg": [
            ('    <g transform="translate(250 336)">',
             '    <g data-party="friends" transform="translate(250 336)">'),
            ('    <g transform="translate(300 372)">',
             '    <g data-party="friends" transform="translate(300 372)">'),
            ('    <g transform="translate(392 386)">',
             '    <g data-party="friends" transform="translate(392 386)">'),
            ('    <g transform="translate(440 366)">',
             '    <g data-party="gorin" transform="translate(440 366)">'),
            ('  <!-- fox at heel -->\n  <g transform="translate(212 366)">',
             '  <!-- Pip at heel -->\n  <g data-party="pip" transform="translate(212 366)">'),
        ],
        "round-10.svg": [
            ('    <g transform="translate(250 336)"><path',
             '    <g data-party="friends" transform="translate(250 336)"><path'),
            ('    <g transform="translate(304 336)"><path',
             '    <g data-party="friends" transform="translate(304 336)"><path'),
            ('    <g transform="translate(510 336)"><path',
             '    <g data-party="gorin" transform="translate(510 336)"><path'),
            ('    <g transform="translate(562 336)"><path d="M0-28 C8-28 12-12 14 0 L-14 0 C-12-12 -8-28 0-28Z"/><circle cx="0" cy="-34" r="6.5"/></g>',
             '    <g data-party="sable" transform="translate(562 336)">'
             '<path d="M0-28 C9-28 14-13 16 0 L-16 0 C-14-13 -9-28 0-28Z"/>'
             '<circle cx="0" cy="-36" r="7"/>'
             '<path d="M-12-12 L-15-24 L-4-16Z M12-12 L15-24 L4-16Z"/>'
             '<circle cx="-5" cy="-36" r="2.5" fill="#3b4a6b"/>'
             '<circle cx="5" cy="-36" r="2.5" fill="#3b4a6b"/></g>'),
        ],
        "ending-friends.svg": [
            ('  <!-- fox with ribbon -->\n  <g transform="translate(326 406)">',
             '  <!-- Pip with ribbon -->\n  <g data-party="pip" transform="translate(326 406)">'),
            ('  <!-- owl overhead, wings spread -->\n  <g transform="translate(620 104) scale(.78)">',
             '  <!-- Sable overhead, wings spread -->\n  <g data-party="sable" transform="translate(620 104) scale(.78)">'),
        ],
    }

    for name, replacements in edits.items():
        path = ASSETS / name
        text = path.read_text()
        for old, new in replacements:
            if new in text and old not in text:
                continue  # already applied
            assert old in text, f"{name}: marker not found -> {old[:70]}"
            text = text.replace(old, new, 1)
        path.write_text(text)

    # Sable cannot have joined by rounds 7 or 9 (threshold 9), so the owl is
    # removed from those scenes entirely rather than appearing before its join.
    for name, marker in [
        ("round-07.svg", "owl perched on the tower wall"),
        ("round-09.svg", "owl gliding ahead"),
    ]:
        path = ASSETS / name
        text = path.read_text()
        pattern = re.compile(
            r"\n  <!-- [^\n]*" + re.escape(marker) + r"[^\n]*-->\n  <g\b.*?</g>",
            re.S,
        )
        if marker in text:
            text, count = pattern.subn("", text, count=1)
            assert count == 1, f"{name}: owl block not found"
            path.write_text(text)

    # Round 9's prose also named the owl before Sable could have joined.
    story = ASSETS.parent / "story.js"
    text = story.read_text()
    stale = " A great grey owl glides ahead, lighting the air with soft grey wings."
    if stale in text:
        text = text.replace(stale, "", 1)
        story.write_text(text)


def build_variant(base, suffix, state, label):
    text = (ASSETS / f"{base}.svg").read_text()
    remove = REMOVE[state]

    def drop_group(match):
        parties = set(match.group(1).split())
        return "" if parties & remove else match.group(0)

    text = re.sub(
        r"\n[ \t]*<g\b[^>]*\bdata-party=\"([^\"]+)\"[^>]*>.*?</g>",
        drop_group,
        text,
        flags=re.S,
    )

    # Remove comments that describe art we just removed.
    keywords = [kw for party in remove for kw in COMMENT_KEYWORDS.get(party, ())]
    kept = []
    for line in text.splitlines(keepends=True):
        stripped = line.strip()
        if stripped.startswith("<!--") and stripped.endswith("-->"):
            if any(kw.lower() in stripped.lower() for kw in keywords):
                continue
        kept.append(line)
    text = "".join(kept)

    if "friends" in remove:
        text = text.replace("torch carried together", "the torch")

    text = re.sub(
        r'aria-label="[^"]*"',
        'aria-label="' + label.replace('"', "&quot;") + '"',
        text,
        count=1,
    )

    out = ASSETS / f"{base}{suffix}.svg"
    out.write_text(text)
    return out.name


def main():
    tag_base_art()
    made = [build_variant(*spec) for spec in VARIANTS]
    print(f"tagged base art and rebuilt {len(made)} variants:")
    for name in made:
        print(f"  {name}")


if __name__ == "__main__":
    main()
