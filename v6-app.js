/* Local, offline prototype. All metrics, accounts and responses are demo fixtures. */
;(() => {
  'use strict'

  /* Lucide icon nodes, ISC license.
   * ISC License
   *
   * Copyright (c) 2026 Lucide Icons and Contributors
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The following Lucide icons are derived from the Feather project:
   *
   * airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
   *
   * The MIT License (MIT) (for the icons listed above)
   *
   * Copyright (c) 2013-present Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  const icons = {
    search: '<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',
    layers:
      '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    type: '<path d="M12 4v16"/><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/>',
    image:
      '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    video:
      '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    'audio-lines':
      '<path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/>',
    mic: '<path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>',
    boxes:
      '<path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/>',
    'file-text':
      '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    'log-in':
      '<path d="m10 17 5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>',
    'log-out':
      '<path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>',
    'scan-text':
      '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h8"/><path d="M7 12h10"/><path d="M7 16h6"/>',
    'circle-dollar-sign':
      '<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>',
    tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    'shield-check':
      '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    server:
      '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>',
    users:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
    'rotate-ccw':
      '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    list: '<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>',
    'table-2':
      '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>',
    'sliders-horizontal':
      '<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>',
    compass:
      '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'chart-no-axes-combined':
      '<path d="M12 16v5"/><path d="M16 14.639V21"/><path d="M20 10.656V21"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18.463V21"/><path d="M8 14.656V21"/>',
    activity:
      '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
    'key-round':
      '<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>',
    wallet:
      '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    settings:
      '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>',
    menu: '<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',
    route:
      '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    brain:
      '<path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    'circle-help':
      '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    trophy:
      '<path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/><path d="M18 9h1.5a1 1 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/><path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>',
    'chart-pie':
      '<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',
    gift: '<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>',
    'book-open':
      '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    'building-2':
      '<path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    pencil:
      '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
    'trash-2':
      '<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    download:
      '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    'arrow-down-up':
      '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>',
    'layout-grid':
      '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    shield:
      '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    route:
      '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    wrench:
      '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    'eye-off':
      '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    'refresh-cw':
      '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    upload:
      '<path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>',
    'chevrons-up-down': '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
    eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    github:
      '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    inbox:
      '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    monitor:
      '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
    'circle-check': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    'triangle-alert':
      '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  }
  // aitokensflux 品牌标：与 /aitokensflux-logo 套件同源的 6 瓣几何，
  // 小尺寸使用各瓣的深色变体以保证在白底上的可辨识度。
  const BRAND_MARK =
    '<svg viewBox="0 0 512 512" fill="none"><path d="M256 202.24C272.38 174.59 349.18 103.99 330.9 70.3A48.13 48.13 0 0 1 271.22 70.3C252.93 103.99 262.14 174.59 256 202.24Z" class="brand-petal-1" fill="#0b3d30"/><path d="M302.56 229.12C334.69 229.48 434.24 260.69 454.27 228.01A48.13 48.13 0 0 1 424.43 176.33C386.11 177.33 329.57 220.62 302.56 229.12Z" class="brand-petal-2" fill="#0d5a46"/><path d="M302.56 282.88C318.31 310.89 341.05 412.71 379.38 413.71A48.13 48.13 0 0 1 409.21 362.03C389.18 329.35 323.43 302.02 302.56 282.88Z" class="brand-petal-3" fill="#0f7b5f"/><path d="M256 309.76C239.62 337.41 162.82 408.01 181.1 441.7A48.13 48.13 0 0 1 240.78 441.7C259.07 408.01 249.86 337.41 256 309.76Z" class="brand-petal-4" fill="#2a9677"/><path d="M209.44 282.88C177.31 282.52 77.76 251.31 57.73 283.99A48.13 48.13 0 0 1 87.57 335.67C125.89 334.67 182.43 291.38 209.44 282.88Z" class="brand-petal-5" fill="#4fae8f"/><path d="M209.44 229.12C193.69 201.11 170.95 99.29 132.62 98.29A48.13 48.13 0 0 1 102.79 149.97C122.82 182.65 188.57 209.98 209.44 229.12Z" class="brand-petal-6" fill="#7cc4aa"/><circle class="brand-core" cx="256" cy="256" r="30" fill="#0b3d30"/></svg>'
  const logos = {
    google:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="#3186FF"/><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#replica-logo-0-provider-gemini-green)"/><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#replica-logo-0-provider-gemini-red)"/><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#replica-logo-0-provider-gemini-yellow)"/><defs><linearGradient id="replica-logo-0-provider-gemini-green" gradientUnits="userSpaceOnUse" x1="7" x2="11" y1="15.5" y2="12"><stop stop-color="#08B962"/><stop offset="1" stop-color="#08B962" stop-opacity="0"/></linearGradient><linearGradient id="replica-logo-0-provider-gemini-red" gradientUnits="userSpaceOnUse" x1="8" x2="11.5" y1="5.5" y2="11"><stop stop-color="#F94543"/><stop offset="1" stop-color="#F94543" stop-opacity="0"/></linearGradient><linearGradient id="replica-logo-0-provider-gemini-yellow" gradientUnits="userSpaceOnUse" x1="3.5" x2="17.5" y1="13.5" y2="12"><stop stop-color="#FABC12"/><stop offset=".46" stop-color="#FABC12" stop-opacity="0"/></linearGradient></defs></svg>',
    gemini:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="#3186FF"/><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#replica-logo-1-provider-gemini-green)"/><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#replica-logo-1-provider-gemini-red)"/><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#replica-logo-1-provider-gemini-yellow)"/><defs><linearGradient id="replica-logo-1-provider-gemini-green" gradientUnits="userSpaceOnUse" x1="7" x2="11" y1="15.5" y2="12"><stop stop-color="#08B962"/><stop offset="1" stop-color="#08B962" stop-opacity="0"/></linearGradient><linearGradient id="replica-logo-1-provider-gemini-red" gradientUnits="userSpaceOnUse" x1="8" x2="11.5" y1="5.5" y2="11"><stop stop-color="#F94543"/><stop offset="1" stop-color="#F94543" stop-opacity="0"/></linearGradient><linearGradient id="replica-logo-1-provider-gemini-yellow" gradientUnits="userSpaceOnUse" x1="3.5" x2="17.5" y1="13.5" y2="12"><stop stop-color="#FABC12"/><stop offset=".46" stop-color="#FABC12" stop-opacity="0"/></linearGradient></defs></svg>',
    qwen: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z" fill="url(#replica-logo-2-provider-qwen-gradient)" fill-rule="nonzero"/><defs><linearGradient id="replica-logo-2-provider-qwen-gradient" x1="0%" x2="100%" y1="0%" y2="0%"><stop offset="0%" stop-color="#6336E7" stop-opacity=".84"/><stop offset="100%" stop-color="#6F69F7" stop-opacity=".84"/></linearGradient></defs></svg>',
    deepseek:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z" fill="#4D6BFE"/></svg>',
    anthropic:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" fill="currentColor"/></svg>',
    openai:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" fill="currentColor"/></svg>',
  }
  const catalog = {
    'claude-3.7': {
      id: 'claude-3.7',
      name: 'Claude 3.7 Sonnet',
      shortName: 'Claude 3.7',
      provider: 'Anthropic',
      glyph: 'A',
      slug: 'anthropic/claude-3.7-sonnet',
      inputRate: 3,
      outputRate: 15,
      input: '$3.00',
      output: '$15.00',
      inputNote: '缓存输入 $0.30',
      context: '200K',
      contextNote: '最大输出 64K',
      latency: '612ms',
      uptime: '99.98%',
      throughput: '73 tok/s',
      summary: '适合复杂推理与工程任务',
      description:
        'Claude 3.7 Sonnet 在复杂代码、工具调用、长文档理解和多步骤推理之间保持均衡。平台会在可用提供方之间自动选择健康路由，并在故障时切换。',
      tags: ['Reasoning', 'Vision', 'Tool calling', 'JSON mode', 'Streaming'],
    },
    'gpt-4.1': {
      id: 'gpt-4.1',
      name: 'GPT-4.1',
      shortName: 'GPT-4.1',
      provider: 'OpenAI',
      glyph: 'O',
      slug: 'openai/gpt-4.1',
      inputRate: 2,
      outputRate: 8,
      input: '$2.00',
      output: '$8.00',
      inputNote: '缓存输入 $0.50',
      context: '1M',
      contextNote: '最大输出 32K',
      latency: '780ms',
      uptime: '99.99%',
      throughput: '88 tok/s',
      summary: '适合工具调用与生产工作负载',
      description:
        'GPT-4.1 面向高可靠工具调用、代码生成与大规模生产任务。它提供超长上下文，并适合需要稳定结构化输出的业务。',
      tags: ['Tool calling', 'Vision', 'Code', 'JSON mode', 'Streaming'],
    },
    'gemini-2.5': {
      id: 'gemini-2.5',
      name: 'Gemini 2.5 Pro',
      shortName: 'Gemini 2.5',
      provider: 'Google',
      glyph: 'G',
      slug: 'google/gemini-2.5-pro',
      inputRate: 1.25,
      outputRate: 10,
      input: '$1.25',
      output: '$10.00',
      inputNote: '缓存输入 $0.31',
      context: '1M',
      contextNote: '最大输出 64K',
      latency: '425ms',
      uptime: '99.96%',
      throughput: '92 tok/s',
      summary: '适合长上下文与多模态分析',
      description:
        'Gemini 2.5 Pro 擅长长文档、图像和复杂上下文混合输入，适合高吞吐分析、知识处理与多模态应用。',
      tags: ['Vision', 'Long context', 'Reasoning', 'Tool calling', 'Streaming'],
    },
    'deepseek-v3': {
      id: 'deepseek-v3',
      name: 'DeepSeek V3',
      shortName: 'DeepSeek V3',
      provider: 'DeepSeek',
      glyph: 'D',
      slug: 'deepseek/deepseek-v3',
      inputRate: 0.27,
      outputRate: 1.1,
      input: '$0.27',
      output: '$1.10',
      inputNote: '缓存输入 $0.07',
      context: '128K',
      contextNote: '最大输出 16K',
      latency: '520ms',
      uptime: '99.94%',
      throughput: '101 tok/s',
      summary: '适合中文、代码与高性价比任务',
      description:
        'DeepSeek V3 在中文理解、代码生成与通用工作负载之间保持较高价格效率，适合吞吐敏感的生产场景。',
      tags: ['Value', 'Code', 'Chinese', 'Fast', 'Streaming'],
    },
    'o3-mini': {
      id: 'o3-mini',
      name: 'o3-mini',
      shortName: 'o3-mini',
      provider: 'OpenAI',
      glyph: 'O',
      slug: 'openai/o3-mini',
      inputRate: 1.1,
      outputRate: 4.4,
      input: '$1.10',
      output: '$4.40',
      inputNote: '缓存输入 $0.55',
      context: '200K',
      contextNote: '最大输出 100K',
      latency: '940ms',
      uptime: '99.95%',
      throughput: '54 tok/s',
      summary: '适合数学、代码与深度推理',
      description: 'o3-mini 面向需要多步思考的数学、工程和代码任务，适合以推理质量优先的工作负载。',
      tags: ['Reasoning', 'Math', 'Code', 'Tool calling', 'Streaming'],
    },
    'claude-haiku': {
      id: 'claude-haiku',
      name: 'Claude 3.5 Haiku',
      shortName: 'Claude Haiku',
      provider: 'Anthropic',
      glyph: 'A',
      slug: 'anthropic/claude-3.5-haiku',
      inputRate: 0.8,
      outputRate: 4,
      input: '$0.80',
      output: '$4.00',
      inputNote: '缓存输入 $0.08',
      context: '200K',
      contextNote: '最大输出 8K',
      latency: '310ms',
      uptime: '99.99%',
      throughput: '128 tok/s',
      summary: '适合低延迟与高并发任务',
      description:
        'Claude 3.5 Haiku 提供较低首 Token 延迟，适合分类、提取、轻量视觉与高并发对话任务。',
      tags: ['Fast', 'Vision', 'Tool calling', 'Code', 'Streaming'],
    },
    'llama-4': {
      id: 'llama-4',
      name: 'Llama 4 Maverick',
      shortName: 'Llama 4',
      provider: 'Meta',
      glyph: 'M',
      slug: 'meta/llama-4-maverick',
      inputRate: 0.22,
      outputRate: 0.88,
      input: '$0.22',
      output: '$0.88',
      inputNote: '缓存输入 $0.05',
      context: '1M',
      contextNote: '最大输出 32K',
      latency: '480ms',
      uptime: '99.91%',
      throughput: '110 tok/s',
      summary: '适合开放模型与多模态场景',
      description:
        'Llama 4 Maverick 提供开放模型生态、长上下文和多模态能力，适合希望保持模型灵活性的团队。',
      tags: ['Open model', 'Vision', 'Long context', 'Fast', 'Streaming'],
    },
    'qwen-3': {
      id: 'qwen-3',
      name: 'Qwen 3 235B',
      shortName: 'Qwen 3',
      provider: 'Qwen',
      glyph: 'Q',
      slug: 'qwen/qwen3-235b',
      inputRate: 0.55,
      outputRate: 2.2,
      input: '$0.55',
      output: '$2.20',
      inputNote: '缓存输入 $0.14',
      context: '128K',
      contextNote: '最大输出 32K',
      latency: '560ms',
      uptime: '99.93%',
      throughput: '90 tok/s',
      summary: '适合中文推理与代码任务',
      description: 'Qwen 3 235B 面向中文、代码和多步骤推理，适合需要中文语境和工具调用能力的业务。',
      tags: ['Reasoning', 'Chinese', 'Code', 'Tool calling', 'Streaming'],
    },
  }
  const modelExtras = {
    'claude-3.7': {
      inputs: ['text', 'image', 'file'],
      usage: 8.2,
      date: '2025-02-24',
      hosts: ['Anthropic', 'Amazon Bedrock', 'Google Vertex'],
    },
    'gpt-4.1': {
      inputs: ['text', 'image', 'file'],
      usage: 7.6,
      date: '2025-04-14',
      hosts: ['OpenAI', 'Azure'],
    },
    'gemini-2.5': {
      inputs: ['text', 'image', 'file', 'audio', 'video'],
      usage: 6.8,
      date: '2025-06-17',
      hosts: ['Google AI Studio', 'Google Vertex'],
    },
    'deepseek-v3': {
      inputs: ['text'],
      usage: 9.1,
      date: '2025-03-24',
      hosts: ['DeepSeek', 'Together', 'Fireworks'],
    },
    'o3-mini': { inputs: ['text'], usage: 3.2, date: '2025-01-31', hosts: ['OpenAI', 'Azure'] },
    'claude-haiku': {
      inputs: ['text', 'image'],
      usage: 5.3,
      date: '2024-10-22',
      hosts: ['Anthropic', 'Amazon Bedrock'],
    },
    'llama-4': {
      inputs: ['text', 'image'],
      usage: 2.7,
      date: '2025-04-05',
      hosts: ['Together', 'Fireworks'],
    },
    'qwen-3': {
      inputs: ['text'],
      usage: 4.5,
      date: '2025-04-28',
      hosts: ['Together', 'Fireworks'],
    },
  }
  const models = Object.values(catalog).map((model) => ({
    ...model,
    ...modelExtras[model.id],
    outputs: ['text'],
    variant: 'standard',
    contextTokens: model.context.endsWith('M') ? 1000000 : parseInt(model.context, 10) * 1000,
    open: ['DeepSeek', 'Meta', 'Qwen'].includes(model.provider),
    zdr: model.provider !== 'DeepSeek',
    tools: model.tags.includes('Tool calling'),
    category: model.tags.includes('Reasoning') ? 'reasoning' : 'general',
  }))
  models.push(
    {
      id: 'qwen-3-free',
      name: 'Qwen 3 235B (free)',
      provider: 'Qwen',
      slug: 'qwen/qwen3-235b:free',
      description: 'Qwen 3 的免费推理变体，支持中文、代码与工具调用。适合评估模型能力和低频实验。',
      inputRate: 0,
      outputRate: 0,
      context: '128K',
      contextTokens: 128000,
      inputs: ['text'],
      outputs: ['text'],
      date: '2025-04-28',
      usage: 1.2,
      hosts: ['Together'],
      variant: 'free',
      open: true,
      zdr: true,
      tools: true,
      category: 'reasoning',
      latency: '810ms',
      throughput: '48 tok/s',
      uptime: '99.82%',
      tags: ['Reasoning', 'Code', 'Tool calling'],
    },
    {
      id: 'flux-1.1-pro',
      name: 'FLUX 1.1 Pro',
      provider: 'Black Forest Labs',
      slug: 'black-forest-labs/flux-1.1-pro',
      description:
        '文本到图像生成模型，擅长细节、文字渲染和提示词遵循。支持多种宽高比，适用于创意制作与产品视觉。',
      inputRate: 0,
      outputRate: 0,
      imagePrice: 0.04,
      context: '4K',
      contextTokens: 4000,
      inputs: ['text'],
      outputs: ['image'],
      date: '2024-10-02',
      usage: 0.12,
      hosts: ['Black Forest Labs'],
      variant: 'standard',
      open: false,
      zdr: true,
      tools: false,
      category: 'creative',
      latency: '2400ms',
      throughput: '1 img/s',
      uptime: '99.95%',
      tags: ['Image generation'],
    },
    {
      id: 'whisper-large-v3',
      name: 'Whisper Large V3',
      provider: 'OpenAI',
      slug: 'openai/whisper-large-v3',
      description:
        '多语言语音识别模型，可将音频转录为文本。支持多种语言，适用于字幕、会议记录和音频内容整理。',
      inputRate: 0,
      outputRate: 0,
      audioPrice: 0.006,
      context: '30s',
      contextTokens: 0,
      inputs: ['audio'],
      outputs: ['transcription'],
      date: '2023-11-06',
      usage: 0.08,
      hosts: ['OpenAI'],
      variant: 'standard',
      open: true,
      zdr: true,
      tools: false,
      category: 'audio',
      latency: '650ms',
      throughput: '30 sec/s',
      uptime: '99.98%',
      tags: ['Transcription'],
    },
    {
      id: 'text-embedding-3-small',
      name: 'Text Embedding 3 Small',
      provider: 'OpenAI',
      slug: 'openai/text-embedding-3-small',
      description:
        '高性价比文本向量模型，将文本转换为用于语义搜索、相似度计算与检索增强生成的向量。支持最高 1536 维输出。',
      inputRate: 0.02,
      outputRate: 0,
      context: '8K',
      contextTokens: 8192,
      inputs: ['text'],
      outputs: ['embeddings'],
      date: '2024-01-25',
      usage: 0.6,
      hosts: ['OpenAI', 'Azure'],
      variant: 'standard',
      open: false,
      zdr: true,
      tools: false,
      category: 'retrieval',
      latency: '92ms',
      throughput: '1800 tok/s',
      uptime: '99.99%',
      tags: ['Embeddings'],
    },
  )
  const modalityNames = {
    all: '全部',
    text: '文本',
    image: '图像',
    video: '视频',
    speech: '语音',
    transcription: '转录',
    embeddings: '向量',
    audio: '音频',
    file: '文件',
  }
  const modalityIcons = {
    all: 'layers',
    text: 'type',
    image: 'image',
    video: 'video',
    speech: 'audio-lines',
    transcription: 'mic',
    embeddings: 'boxes',
    audio: 'audio-lines',
    file: 'file-text',
  }
  function currentHosts() {
    return [...new Set(models.flatMap((model) => model.hosts))]
  }
  function cloneModel(model) {
    return {
      ...model,
      inputs: [...(model.inputs || [])],
      outputs: [...(model.outputs || [])],
      hosts: [...(model.hosts || [])],
      tags: [...(model.tags || [])],
    }
  }
  const mockModels = models.map(cloneModel)
  let catalogLive = false
  let catalogReady = false
  // G-32：boot 完成前不渲染依赖登录态/目录的分支，避免闪"需要登录"和演示目录
  let booted = false
  const platform = {
    online: false,
    authed: false,
    user: null,
    status: null,
    tokens: [],
    group: '',
    error: '',
  }
  const app = document.getElementById('app')
  // T10.2：动态样式走 data-w/data-h/data-bg 属性 + CSSOM 注水，HTML 里不再出现内联 style
  // MutationObserver 覆盖 innerHTML、dialog、toast 等一切渲染路径；微任务时序保证绘制前完成
  const hydrateDataStyles = (node) => {
    if (node.nodeType !== 1) return
    const targets = node.matches('[data-w],[data-h],[data-bg]') ? [node] : []
    node.querySelectorAll('[data-w],[data-h],[data-bg]').forEach((el) => targets.push(el))
    targets.forEach((el) => {
      if (!el.dataset || !el.style) return
      if (el.dataset.w) el.style.width = el.dataset.w
      if (el.dataset.h) el.style.height = el.dataset.h
      if (el.dataset.bg) el.style.background = el.dataset.bg
    })
  }
  new MutationObserver((mutations) => {
    mutations.forEach((m) => m.addedNodes.forEach(hydrateDataStyles))
  }).observe(document.body, { childList: true, subtree: true })
  const dialog = document.createElement('dialog')
  dialog.className = 'v6-dialog'
  document.body.append(dialog)
  // 部署配置（config.js）与功能开关
  const appConfig = (typeof window !== 'undefined' && window.SKIN_CONFIG) || {}
  const feature = (name) => Boolean(appConfig.features && appConfig.features[name])
  const demoEnabled = appConfig.demoFallback !== false
  const storageKey = 'aitokensflux-ui-v1'
  // 迁移：旧版本地状态（含演示密钥、对话遗留）整体丢弃
  try {
    localStorage.removeItem('tokenflux-v6-demo-v2')
    sessionStorage.removeItem('aitokensflux.keySecrets')
  } catch {
    /* storage may be disabled */
  }
  const defaults = {
    pins: [],
    settings: { name: 'aitokensflux 工作区', zdr: true, fallback: true, theme: 'system' },
  }
  let saved = {}
  try {
    saved = JSON.parse(localStorage.getItem(storageKey) || '{}')
  } catch {
    /* File previews may have storage disabled. */
  }
  // 只保留白名单字段：pins 与 settings，其余每次启动重置
  const state = {
    pins: Array.isArray(saved.pins) ? saved.pins : [],
    settings: { ...defaults.settings, ...(saved.settings || {}) },
  }
  state.pins = state.pins.filter((id) => models.some((model) => model.id === id))
  // PE-01：启动时应用主题偏好；system 时移除 data-theme，交给 prefers-color-scheme
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  function effectiveTheme(theme = state.settings.theme) {
    if (theme === 'light' || theme === 'dark') return theme
    return darkQuery.matches ? 'dark' : 'light'
  }
  function themeToggleLabel() {
    return effectiveTheme() === 'dark' ? '切换到浅色模式' : '切换到深色模式'
  }
  function applyTheme() {
    const theme = state.settings.theme || 'system'
    if (theme === 'system') delete document.documentElement.dataset.theme
    else document.documentElement.dataset.theme = theme
    syncThemeControls()
  }
  // 顶栏按钮与偏好页分段控件可能同时在场，任一处切换都要让另一处同步
  function syncThemeControls() {
    const label = themeToggleLabel()
    document.querySelectorAll('[data-action="theme-toggle"]').forEach((node) => {
      node.setAttribute('aria-label', label)
      node.title = label
    })
    const value = state.settings.theme || 'system'
    document.querySelectorAll('[data-action="theme-set"]').forEach((node) => {
      const on = node.dataset.value === value
      node.classList.toggle('active', on)
      node.setAttribute('aria-checked', String(on))
      node.setAttribute('aria-pressed', String(on))
    })
    const meta = document.querySelector('meta[name="theme-color"]')
    const canvas = getComputedStyle(document.documentElement).getPropertyValue('--canvas').trim()
    if (meta && canvas) meta.content = canvas
  }
  // 150ms 交叉淡化；不支持 View Transitions 或偏好减少动效时直接切换
  function setTheme(value, origin) {
    const commit = () => {
      state.settings.theme = value
      save()
      applyTheme()
      redrawThemedCharts()
    }
    const root = document.documentElement
    if (
      effectiveTheme(value) === effectiveTheme() ||
      typeof document.startViewTransition !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      commit()
      return
    }
    root.classList.add('theme-transition')
    const transition = document.startViewTransition(commit)
    transition.finished.finally(() => root.classList.remove('theme-transition'))
  }
  // canvas 图表在绘制时读取颜色 token，换主题后要重画，否则网格和文字停留在旧主题配色
  function redrawThemedCharts() {
    if (document.querySelector('#app canvas[data-chart]')) drawCharts()
  }
  darkQuery.addEventListener?.('change', () => {
    if ((state.settings.theme || 'system') !== 'system') return
    syncThemeControls()
    redrawThemedCharts()
  })
  applyTheme()
  let route = 'home'
  let params = new URLSearchParams()
  let dialogOpener = null
  let chartObserver = null
  let sectionObserver = null
  let sectionActiveUpdater = null
  let logsTimer = null
  let statusTimer = null
  let sectionLockUntil = 0
  let toastTimer = 0
  let catalogFilter = null
  let activitySearchTimer = 0
  let logoIndex = 0
  const charts = []
  const liveChartData = {}
  const liveData = { logs: { items: [], total: 0, page: 1 }, logsList: { page: 1 }, stats: null, usage: null }
  // 性能监控缓存：map=模型名→指标，series=模型名→recent_success_series，key=请求指纹（60s 内同参不重取）
  const perfState = { map: {}, series: {}, key: '', stamp: 0 }
  const PERF_TTL = 60000

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state))
    } catch {
      /* Keep working in memory if storage is unavailable. */
    }
  }
  function esc(value) {
    return String(value ?? '').replace(
      /[&<>"']/g,
      (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
    )
  }
  function icon(name) {
    return `<svg class="v6-icon" aria-hidden="true" viewBox="0 0 24 24">${icons[name] || icons.layers}</svg>`
  }
  function money(value) {
    // G-42 / T4.1：≥$1 两位小数；$0.01–$1 至少两位小数、最多 4 位有效数字（0.30/0.27/0.15）；
    // <$0.01 最多 4 位有效数字——避免 "$0.3" 与 "$0.27" 并列显得精度不一
    const n = Number(value) || 0
    const abs = Math.abs(n)
    if (abs >= 1)
      return (
        '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      )
    if (abs === 0) return '$0.00'
    if (abs >= 0.01)
      return (
        '$' +
        Number(n.toPrecision(4)).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        })
      )
    return '$' + n.toLocaleString('en-US', { maximumSignificantDigits: 4 })
  }
  // T4.1：token/计数量统一缩写——1.2K、3.4M、1.05B（最多 3 位有效数字，去掉尾零）
  function fmtTokens(n) {
    const v = Number(n)
    if (!Number.isFinite(v)) return '—'
    const trim = (x) => String(+x.toFixed(2))
    if (Math.abs(v) >= 1e9) return trim(v / 1e9) + 'B'
    if (Math.abs(v) >= 1e6) return trim(v / 1e6) + 'M'
    if (Math.abs(v) >= 1e3) return trim(v / 1e3) + 'K'
    return String(Math.round(v))
  }
  // T4.1 / HM-02：上下文长度——1M、1.05M、200K、128K（1049K 这类写法不再出现）
  function fmtContext(tokens) {
    const n = Number(tokens)
    if (!Number.isFinite(n) || n <= 0) return '—'
    if (n >= 1e6) return (+ (n / 1e6).toFixed(2)) + 'M'
    if (n >= 1e3) return Math.round(n / 1e3) + 'K'
    return String(n)
  }
  function contextLabel(model) {
    return model.contextTokens ? fmtContext(model.contextTokens) : model.context
  }
  // T4.1：百分比统一 1 位小数（成功率统计仍走 fmtRate 的两位精度）
  function pct(v) {
    const n = Number(v)
    if (!Number.isFinite(n)) return '—'
    return n.toFixed(1) + '%'
  }
  // ── 性能监控格式化：对齐 new-api performance-metrics/format.ts ──
  function fmtMs(ms) {
    const n = Number(ms)
    if (!Number.isFinite(n) || n <= 0) return '—'
    if (n >= 1000) return (n / 1000).toFixed(2) + 's'
    return Math.round(n) + 'ms'
  }
  function fmtTps(tps) {
    const n = Number(tps)
    if (!Number.isFinite(n) || n <= 0) return '—'
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K t/s'
    return n.toFixed(n < 10 ? 2 : 1) + ' t/s'
  }
  function fmtRate(rate) {
    const n = Number(rate)
    if (!Number.isFinite(n) || n < 0 || n > 100) return '—'
    return n.toFixed(2) + '%'
  }
  function successLevel(rate) {
    const n = Number(rate)
    if (!Number.isFinite(n)) return 'unknown'
    if (n >= 100) return 'excellent'
    if (n >= 90) return 'good'
    if (n >= 70) return 'warning'
    return 'critical'
  }
  // T4.4：可用性条图例（正常 / 降级 / 故障 / 无数据）
  function uptimeLegend() {
    return `<div class="v6-uptime-legend" aria-hidden="true">${[
      ['ok', '正常'],
      ['warning', '降级'],
      ['critical', '故障'],
      ['unknown', '无数据'],
    ]
      .map(([cls, name]) => `<span><i class="${cls}"></i>${name}</span>`)
      .join('')}</div>`
  }
  // 成功率点阵：recent_success_series 末尾 ≤24 点，按分档上色（仿 new-api ModelPerfBadge）
  function perfDots(seriesPoints) {
    const pts = (Array.isArray(seriesPoints) ? seriesPoints : [])
      .filter(
        (p) =>
          Number.isFinite(Number(p && p.ts)) &&
          Number.isFinite(Number(p && p.success_rate)) &&
          Number(p.success_rate) >= 0 &&
          Number(p.success_rate) <= 100,
      )
      .sort((a, b) => Number(a.ts) - Number(b.ts))
      .slice(-24)
    if (!pts.length) return ''
    return `<span class="v6-perf-dots" role="img" aria-label="最近成功率">${pts
      .map((p) => `<i class="${successLevel(p.success_rate)}"></i>`)
      .join('')}</span>`
  }
  // T2.11：品牌标识块——size 可选 'md'(28)/'lg'(40)，默认 24
  function logo(provider, size = '') {
    const cls = size ? ` v6-logo-${size}` : ''
    const prefix = 'v6-logo-' + ++logoIndex + '-'
    const svg = logos[provider.toLowerCase()]
      ?.replaceAll('id="', 'id="' + prefix)
      .replaceAll('url(#', 'url(#' + prefix)
    if (svg) return `<span class="v6-logo${cls}" aria-hidden="true">${svg}</span>`
    // 无品牌图标时用首字母徽标（中性方块）
    const name = String(provider || '')
    const letter = (name.match(/[\p{L}\p{N}]/u) || ['?'])[0].toUpperCase()
    return `<span class="v6-logo v6-logo-initial${cls}" aria-hidden="true">${esc(letter)}</span>`
  }
  function link(path, label, className = 'v6-btn', symbol = '', iconAfter = false) {
    const svg = symbol ? icon(symbol) : ''
    // G-48：尾随箭头放文字右侧（"浏览全部 →"），图标型链接保持图标在前
    return `<a class="${className}${iconAfter ? ' v6-link-arrow' : ''}" href="#/${path}">${iconAfter ? `${label}${svg}` : `${svg}${label}`}</a>`
  }
  function button(action, label, symbol = '', extra = '', className = 'v6-btn') {
    return `<button type="button" class="${className}" data-action="${action}" ${extra}>${symbol ? icon(symbol) : ''}${label}</button>`
  }
  function iconButton(action, label, symbol, extra = '', className = 'v6-btn ghost v6-icon-btn') {
    return button(
      action,
      '',
      symbol,
      `aria-label="${esc(label)}" data-tip="${esc(label)}" ${extra}`,
      className,
    )
  }
  function getModel(id) {
    return models.find((model) => model.id === id)
  }
  function routeModelId() {
    if (!route.startsWith('models/')) return ''
    try {
      return decodeURIComponent(route.slice(7))
    } catch {
      return route.slice(7)
    }
  }
  function tabs(items, active, action, label) {
    return `<div class="v6-tabs" role="tablist" aria-label="${label}">${items.map(([value, text, symbol]) => `<button type="button" role="tab" aria-selected="${value === active}" tabindex="${value === active ? 0 : -1}" class="${value === active ? 'active' : ''}" data-action="${action}" data-value="${value}">${symbol ? icon(symbol) : ''}${text}</button>`).join('')}</div>`
  }
  function search(id, placeholder, value = '') {
    // T2.2：搜索框带清除按钮（:placeholder-shown 控制显隐）
    return `<div class="v6-search">${icon('search')}<input class="v6-input" type="search" id="${id}" aria-label="${placeholder}" placeholder="${placeholder}" value="${esc(value)}" autocomplete="off"><button type="button" class="v6-search-clear" data-action="search-clear" tabindex="-1" aria-label="清除搜索"${value ? '' : ' disabled'}><i aria-hidden="true">×</i></button></div>`
  }
  function empty(title, detail, action = '', symbol = 'box') {
    // G-37：空态统一为 图标圆底 + 标题 + 说明 + 操作
    return `<div class="v6-empty"><span class="v6-empty-icon">${icon(symbol)}</span><h3>${title}</h3><p>${detail}</p>${action}</div>`
  }
  function errorBox(title, detail = '', retry = '', tech = '') {
    // G-36/T4.3：错误态统一为 图标 + 友好标题 + 可折叠技术详情 + 可选重试
    return `<div class="v6-error-box v6-error"><span class="v6-empty-icon">${icon('info')}</span><h3>${esc(title)}</h3>${detail ? `<div class="detail">${esc(detail)}</div>` : ''}${tech ? `<details class="v6-error-tech"><summary>技术详情</summary><pre>${esc(tech)}</pre></details>` : ''}${retry}</div>`
  }
  function skeletonRows(n = 5) {
    // G-35：表格/列表加载骨架，占位高度避免数据回来后跳动
    return `<div class="v6-skeleton-list">${Array.from({ length: n }, () => '<span class="v6-skeleton v6-skeleton-row"></span>').join('')}</div>`
  }
  function startCodeCountdown(btn, seconds = 60) {
    // AU-05：发送验证码成功后进入倒计时，避免连点刷接口
    if (!btn) return
    let left = seconds
    btn.disabled = true
    const tick = () => {
      if (left <= 0) {
        clearInterval(timer)
        btn.textContent = '获取验证码'
        btn.disabled = false
        return
      }
      btn.textContent = `重新发送 (${left--}s)`
    }
    const timer = setInterval(tick, 1000)
    tick()
  }
  async function withBusy(el, task, busyLabel = '') {
    // G-27/AU-01/T2.1：提交期间禁用按钮、显示 spinner 与进行中文案，防重复提交；
    // is-busy 用覆盖层 spinner，文案原样保留不跳动
    if (!el || el.getAttribute('aria-busy') === 'true') return undefined
    const label = el.innerHTML
    el.classList.add('is-busy')
    el.setAttribute('aria-busy', 'true')
    el.disabled = true
    if (busyLabel) el.textContent = busyLabel
    try {
      return await (typeof task === 'function' ? task() : task)
    } finally {
      el.classList.remove('is-busy')
      el.removeAttribute('aria-busy')
      el.disabled = false
      if (busyLabel) el.innerHTML = label
    }
  }
  // T2.7：KPI 数值排印——货币符号/单位缩到 0.6em（v6-unit），数值本体不加空白。
  // 规则：按数字串切分，非数字片段去首尾分隔符后，含字母/货币/%/× 的才缩小；
  // 纯分隔符（" / "、"-"）保持原尺寸；无数字的纯文本与含 HTML 的值原样透传。
  function kpi(value) {
    const v = String(value)
    if (v.includes('<') || !/\d/.test(v)) return v === '—' ? '<span class="v6-na" data-tip="暂无数据">—</span>' : v
    const SEP_S = /^[\s/\-–—_:.,()·]+/
    const SEP_E = /[\s/\-–—_:.,()·]+$/
    const UNITISH = /[a-zA-Z$¥€£%×°]/
    return v
      .split(/(\d[\d,.]*)/)
      .map((p, i) => {
        if (!p) return ''
        if (i % 2 === 1) return esc(p)
        const lead = (p.match(SEP_S) || [''])[0]
        const trail = (p.slice(lead.length).match(SEP_E) || [''])[0]
        const mid = p.slice(lead.length, p.length - trail.length)
        return esc(lead) + (mid && UNITISH.test(mid) ? `<em class="v6-unit">${esc(mid)}</em>` : esc(mid)) + esc(trail)
      })
      .join('')
  }
  // T3.2 / G-38：字段级校验——aria-invalid + 字段下方 v6-field-msg 提示
  function fieldError(input, msg) {
    input.setAttribute('aria-invalid', 'true')
    const host = input.closest('.v6-field') || input.parentElement
    let hint = host?.querySelector('.v6-field-msg')
    if (!hint && host) {
      hint = document.createElement('div')
      hint.className = 'v6-field-msg'
      host.append(hint)
    }
    if (hint) hint.textContent = msg
  }
  function fieldValidate(form, rules) {
    // rules: [[fieldName, 是否出错, 提示], …]；标记全部出错字段并聚焦第一个
    let firstBad = null
    rules.forEach(([name, bad, msg]) => {
      if (!bad) return
      const input = form.elements[name]
      if (!input || typeof input.focus !== 'function') return
      fieldError(input, msg)
      if (!firstBad) firstBad = input
    })
    firstBad?.focus()
    return !firstBad
  }
  function stat(label, value, note = '') {
    return `<div class="v6-stat"><small>${label}</small><strong>${kpi(value)}</strong>${note ? `<div class="v6-muted v6-small">${note}</div>` : ''}</div>`
  }
  function check(name, value, label, checked = false, count = '') {
    return `<label class="v6-check"><input type="checkbox" name="${name}" value="${esc(value)}" ${checked ? 'checked' : ''}><span>${label}</span>${count !== '' ? `<small>${count}</small>` : ''}</label>`
  }
  function group(title, symbol, content, open = false) {
    return `<details class="v6-filter" ${open ? 'open' : ''}><summary>${icon(symbol)}${title}${icon('chevron-right')}</summary><div class="v6-filter-body">${content}</div></details>`
  }
  function sectionNav(items) {
    return `<nav class="v6-section-nav" aria-label="页面分区">${items.map(([id, label, symbol], index) => `<a href="#/${route}?${params.toString()}" data-section="${esc(id)}" class="${index === 0 ? 'active' : ''}">${icon(symbol)}${label}</a>`).join('')}</nav>`
  }
  function section(id, title, description, content, titleExtra = '') {
    // T6.5：标题悬停锚点——# 按钮就地滚动，不触碰 hash 路由
    return `<section id="${id}" class="v6-section"><h2>${title}${titleExtra}<button type="button" class="v6-anchor" data-action="anchor-scroll" data-anchor="${esc(id)}" aria-label="滚动到本节" tabindex="-1">${icon('hash')}</button></h2>${description ? `<p>${description}</p>` : ''}${content}</section>`
  }
  function chart(id, kind = 'usage', size = '') {
    // T4.2：概览 180（.v6-chart-sm）、活动/排行 240（默认）、详情 220（--detail）
    return `<div class="v6-chart${size ? ` v6-chart--${size}` : ''}"><canvas data-chart="${kind}" id="${id}" role="img" aria-label="${kind === 'usage' ? '模型用量趋势' : kind === 'price' ? '模型价格历史' : kind === 'perf-live' ? '实测吞吐趋势' : '性能变化趋势'}${kind === 'performance' ? '，演示数据' : ''}"></canvas><div class="v6-chart-cross" hidden></div><div class="v6-chart-tooltip" hidden></div></div>`
  }
  function pin(model) {
    return iconButton(
      'pin',
      state.pins.includes(model.id) ? '取消收藏' : '收藏模型',
      'star',
      `data-id="${esc(model.id)}" aria-pressed="${state.pins.includes(model.id)}"`,
    )
  }
  function modelPrice(model) {
    return model.imagePrice
      ? `${money(model.imagePrice)} / 张图像`
      : model.audioPrice
        ? `${money(model.audioPrice)} / 分钟`
        : `${money(model.inputRate)} / 百万 tokens`
  }
  function hasContext(model) {
    return Boolean(model.context) && model.context !== '—'
  }
  // 目录里没有任何模型带上下文长度时，整列/整项隐藏，避免满屏 "—"
  function catalogHasContext() {
    return models.some(hasContext)
  }
  // 兜底 "Platform" 不是真实厂商，不计入厂商数与信任条
  function realProviders() {
    return [...new Set(models.map((model) => model.provider).filter((p) => p && p !== 'Platform'))]
  }
  function modelCard(model) {
    // T6.2：三段式行布局——左 28px logo + 名称/slug，中右对齐三列数值，右复制/收藏
    const detail = '#/models/' + encodeURIComponent(model.id)
    const priced = !(model.imagePrice || model.audioPrice)
    const numCells = `${catalogHasContext() ? `<span class="v6-mnum"><b>${hasContext(model) ? esc(contextLabel(model)) : '—'}</b><small>上下文</small></span>` : ''}${
      priced
        ? `<span class="v6-mnum"><b>${money(model.inputRate)}</b><small>输入 $/百万</small></span><span class="v6-mnum"><b>${money(model.outputRate)}</b><small>输出 $/百万</small></span>`
        : `<span class="v6-mnum"><b>${money(model.imagePrice || model.audioPrice)}</b><small>${model.imagePrice ? '每张图像' : '每分钟音频'}</small></span><span class="v6-mnum"><b>—</b><small>输出 $/百万</small></span>`
    }`
    return `<article class="v6-model" data-model-id="${esc(model.id)}" data-perf-for="${esc(model.id)}">${logo(model.provider)}<div class="v6-model-id"><a class="v6-model-title" href="${detail}">${esc(model.name)}</a><small class="v6-model-sub">${esc(model.provider)} · ${esc(model.slug || model.id)}</small>${model.description ? `<a class="v6-model-description" href="${detail}">${esc(model.description)}</a>` : ''}</div><div class="v6-model-nums">${numCells}</div><div class="v6-model-ops"><div class="v6-perf" hidden>${perfBadgeHTML(model.id)}</div>${iconButton('copy', '复制模型 ID', 'copy', `data-copy="${esc(model.slug)}"`)}${pin(model)}</div></article>`
  }
  // T6.8：前三名名次徽标，4+ 普通 tnum 数字
  function rankBadge(index) {
    return index < 3
      ? `<span class="v6-medal v6-medal-${index + 1}" aria-label="第 ${index + 1} 名">${index + 1}</span>`
      : `<span class="v6-num">${index + 1}</span>`
  }
  function rankedRows(list, metric = 'usage') {
    return list
      .map(
        (model, index) =>
          `<a class="v6-ranked-row" href="#/models/${esc(model.id)}"><span class="v6-ranked-pos">${rankBadge(index)}</span><div class="v6-row">${logo(model.provider)}<div><strong>${esc(model.name)}</strong><small>${esc(model.provider)}</small></div></div><div>${metric === 'speed' ? model.throughput : model.usage + 'B tokens'}<small>${metric === 'speed' ? '吞吐量' : 'Tokens'}</small></div></a>`,
      )
      .join('')
  }

  function accountName() {
    return platform.user?.display_name || platform.user?.username || state.settings.name
  }
  function feat_nav(name) {
    return feature(name) ? link(name, '排行榜', '') : ''
  }
  function renderHeader() {
    const header = document.querySelector('.app-header')
    header.classList.add('v6-header')
    const account = !booted
      ? '<span class="v6-skeleton v6-skel-account" aria-hidden="true"></span>'
      : platform.authed
        ? `<details class="v6-dropdown"><summary class="v6-account-btn" aria-label="账户"><span class="v6-avatar">${esc(accountName().slice(0, 1))}</span><span class="v6-account-label">${esc(accountName())}</span>${icon('chevron-down')}</summary><div class="v6-menu right">${[
          ['console', '用量概览', 'layout-grid'],
          ['console/keys', 'API Keys', 'key-round'],
          ['console/activity', '活动记录', 'activity'],
          ['console/credits', '余额与账单', 'wallet'],
          ['console/settings', '工作区设置', 'settings'],
          ['console/profile', '个人资料', 'user'],
        ]
          .map(([path, name, symbol]) => link(path, name, '', symbol))
          .join('')}<span class="v6-menu-sep" aria-hidden="true"></span><button type="button" class="danger" data-action="logout">${icon('log-out')}退出登录</button></div></details>`
        : button('open-login', '登录', 'log-in', '', 'v6-btn primary')
    header.innerHTML = `<div class="header-inner"><a class="brand" href="#/home" aria-label="aitokensflux 首页"><span class="brand-mark" aria-hidden="true">${BRAND_MARK}</span><span class="brand-word">aitokens<em>flux</em></span></a><nav class="primary-nav" aria-label="主导航">${link('models', '模型', 'nav-link ' + (['models', 'discover', 'providers'].includes(route.split('/')[0]) ? 'active' : ''))}${feature('rankings') ? link('rankings', '排行榜', 'nav-link ' + (route === 'rankings' ? 'active' : '')) : ''}${link('pricing', '价格', 'nav-link ' + (route === 'pricing' ? 'active' : ''))}${link('docs', '文档', 'nav-link ' + (route === 'docs' ? 'active' : ''))}</nav><div class="header-actions"><button class="header-search" data-action="search" aria-label="搜索模型与页面">${icon('search')}<span>搜索</span><span class="keycap">⌘ K</span></button>${themeToggle()}${account}${button('mobile-menu', '', 'menu', 'aria-label="打开菜单"', 'v6-btn v6-icon-btn v6-mobile-menu')}</div></div>`
  }
  function themeToggle() {
    const label = themeToggleLabel()
    return `<button type="button" class="v6-btn ghost v6-icon-btn v6-theme-toggle" data-action="theme-toggle" aria-label="${label}" data-tip="${label}">${icon('sun')}${icon('moon')}</button>`
  }
  // D8/T5.3：公共页轻页脚——品牌 + 版权 + 3 个核心链接（首页保留 sr-footer 大脚）
  function footer() {
    const year = new Date().getFullYear()
    return `<footer class="v6-footer v6-footer-light"><a href="#/home" class="brand"><span class="brand-mark" aria-hidden="true">${BRAND_MARK}</span><span class="brand-word">aitokens<em>flux</em></span></a><span class="v6-footer-copy">© ${year} aitokensflux</span><nav class="v6-footer-links" aria-label="页脚导航">${link('models', '模型目录', '')}${link('pricing', '价格', '')}${link('docs', '文档', '')}</nav></footer>`
  }

  function homeModelCard(model) {
    const priced = !(model.imagePrice || model.audioPrice)
    return `<article class="sr-model-card" data-route="#/models/${encodeURIComponent(model.id)}" tabindex="0" role="link"><div class="sr-model-head"><span class="sr-model-logo">${logo(model.provider)}</span><p><strong>${esc(model.name)}</strong><small>${esc((model.slug || model.id) === model.name ? model.provider : model.slug || model.id)}</small></p></div><div class="sr-model-data">${priced ? `<span><small>输入 / 百万</small><b>${money(model.inputRate)}</b></span><span><small>输出 / 百万</small><b>${money(model.outputRate)}</b></span>` : `<span><small>计价</small><b>${modelPrice(model)}</b></span>`}${hasContext(model) ? `<span><small>上下文</small><b>${esc(contextLabel(model))}</b></span>` : ''}</div></article>`
  }
  function renderHome() {
    app.append(document.getElementById('page-home').content.cloneNode(true))
    const home = app.querySelector('.premium-home')
    // 首屏统计：全部取自真实目录，没有真实值的项隐藏
    const setMetric = (id, value, note) => {
      const node = home.querySelector('#' + id)
      if (!node) return
      node.querySelector('strong').textContent = value || '—'
      node.hidden = !value
      if (value && note) node.insertAdjacentHTML('beforeend', `<small class="sr-metric-note">${esc(note)}</small>`)
    }
    const ready = catalogReady && models.length
    setMetric('sr-metric-models', ready ? String(models.length) : '')
    if (ready) {
      setMetric('sr-metric-providers', String(realProviders().length))
      // 价格和上下文只在对话（文本输出）模型之间比较，嵌入等模型单价不可比
      const chatModels = models.filter((model) => (model.outputs[0] || 'text') === 'text')
      const longest = chatModels.reduce(
        (best, model) => ((model.contextTokens || 0) > (best?.contextTokens || 0) ? model : best),
        null,
      )
      setMetric('sr-metric-context', longest && hasContext(longest) ? contextLabel(longest) : '', longest?.name)
      const cheapest = chatModels
        .filter((model) => model.inputRate > 0)
        .reduce((best, model) => (!best || model.inputRate < best.inputRate ? model : best), null)
      setMetric('sr-metric-price', cheapest ? money(cheapest.inputRate) : '', cheapest?.name)
    }
    const metricGroup = home.querySelector('.sr-metric-group')
    const visibleMetrics = metricGroup ? metricGroup.querySelectorAll('.sr-metric:not([hidden])').length : 0
    if (metricGroup) metricGroup.dataset.count = visibleMetrics
    // 信任条：列出现目录实际接入的提供商（取前 6，超出时注明总数，与「模型提供商」统计一致），目录未就绪时整条隐藏
    const trustBar = home.querySelector('#sr-trust-bar')
    const trustList = home.querySelector('#sr-trust-list')
    if (trustBar && trustList) {
      const all = realProviders()
      const names = all.slice(0, 6)
      if (ready && names.length) {
        trustList.textContent = names.join(' · ') + (all.length > names.length ? ` 等 ${all.length} 家` : '')
        trustBar.hidden = false
      }
    }
    const metricsSection = home.querySelector('.sr-metrics')
    if (metricsSection) metricsSection.hidden = !visibleMetrics && (!trustBar || trustBar.hidden)
    // 精选模型：优先 config.featuredModels 指定的真实模型，否则取目录前三个；空目录整块隐藏
    const featuredSection = home.querySelector('.sr-models')
    const featuredGrid = home.querySelector('#sr-model-grid')
    if (featuredSection && featuredGrid && catalogReady) {
      const configured = Array.isArray(appConfig.featuredModels)
        ? appConfig.featuredModels.map(getModel).filter(Boolean)
        : []
      const vendorModels = models.filter((model) => model.provider !== 'Platform')
      const featured = configured.length ? configured : (vendorModels.length ? vendorModels : models).slice(0, 3)
      if (featured.length) {
        featuredGrid.innerHTML = featured.map(homeModelCard).join('')
        featuredSection.hidden = false
      }
    }
    // 兜底清理：仍指向不存在模型的演示卡片（路由中的 id 是 encodeURIComponent 过的，需先解码再比对）
    if (catalogReady) {
      home.querySelectorAll('[data-route^="#/models/"]').forEach((el) => {
        const target = el.dataset.route.slice('#/models/'.length)
        let id = target
        try {
          id = decodeURIComponent(target)
        } catch {
          // 非法编码时按原样比对
        }
        if (id && !getModel(id)) el.remove()
      })
    }
    // 页脚状态：只在 Platform 确认在线时展示；落地页不向访客展示故障，详情留给 #/status
    const statusPill = home.querySelector('#sr-footer-status')
    if (statusPill && !(catalogReady && platform.online)) statusPill.remove()
    requestAnimationFrame(() => home.classList.add('route-connected'))
  }

  function renderModels() {
    catalogFilter = {
      query: params.get('q') || '',
      output: params.get('output') || 'all',
      author: params.get('author') || '',
      category: params.get('category') || '',
      host: params.get('provider') || '',
      sort: params.get('sort') || 'newest',
      variant: params.get('variant') || 'all',
      pinned: params.get('pinned') === 'true',
      view: params.get('view') === 'table' ? 'table' : 'list',
    }
    // 目录为空时不展示筛选器：区分「平台未配置模型」与「Platform 不可达」
    if (catalogReady && !models.length) {
      app.innerHTML = `<div class="v6-shell"><div class="v6-title"><div><h1>模型</h1><p>浏览目录中的全部模型。</p></div></div>${empty(
        catalogLive ? '尚未配置可用模型' : '服务暂时不可用',
        catalogLive
          ? '管理后台为当前分组添加可用模型后，目录会自动展示在这里。'
          : '请稍后重试，或查看服务状态页确认运行情况。',
        `${button('catalog-retry', '重试', 'rotate-ccw')} ${link('docs', '查看接入文档', 'v6-btn')}`,
      )}</div>`
      return
    }
    const selectedInputs = (params.get('inputs') || '').split(',')
    const authors = [...new Set(models.map((model) => model.provider))]
    const categoryCount = (value) =>
      models.filter((model) =>
        value === 'vision'
          ? model.inputs.includes('image')
          : value === 'fast'
            ? parseInt(model.latency, 10) < 500
            : value === 'code'
              ? model.tags.includes('Code')
              : model.category === value,
      ).length
    const parameterCount = (value) =>
      models.filter((model) =>
        value === 'tools'
          ? model.tools
          : value === 'structured'
            ? model.tags.includes('JSON mode')
            : model.outputs.includes('text'),
      ).length
    const filterGroups =
      group(
        '输入模态',
        'log-in',
        ['text', 'image', 'file', 'audio', 'video']
          .map((value) =>
            check(
              'input',
              value,
              modalityNames[value],
              selectedInputs.includes(value),
              models.filter((model) => model.inputs.includes(value)).length,
            ),
          )
          .join(''),
        true,
      ) +
      (catalogHasContext()
        ? group(
            '上下文长度',
            'scan-text',
            `<label>至少 <output id="context-label">${Number(params.get('context') || 0)}K</output><input type="range" id="context-range" min="0" max="1000" step="8" value="${Number(params.get('context') || 0)}"></label>`,
            Boolean(params.get('context')),
          )
        : '') +
      group(
        '输入价格',
        'circle-dollar-sign',
        `<label>最高 <output id="price-label">${params.get('price') ? money(params.get('price')) : '不限'}</output> / 百万 tokens<input type="range" id="price-range" min="0" max="20" step="0.05" value="${Number(params.get('price') ?? 20)}"></label>`,
        Boolean(params.get('price')),
      ) +
      group(
        '类别',
        'tag',
        [
          ['code', '编程'],
          ['reasoning', '推理'],
          ['vision', '视觉理解'],
          ...(catalogLive ? [] : [['fast', '低延迟']]),
        ]
          .map(([value, label]) =>
            check(
              'category',
              value,
              label,
              catalogFilter.category.split(',').includes(value),
              categoryCount(value),
            ),
          )
          .join(''),
      ) +
      group(
        '支持的参数',
        'code',
        [
          ['tools', '工具调用'],
          ['structured', '结构化输出'],
          ['streaming', '流式输出'],
        ]
          .map(([value, label]) =>
            check(
              'parameter',
              value,
              label,
              (params.get('parameters') || '').split(',').includes(value),
              parameterCount(value),
            ),
          )
          .join(''),
      ) +
      group(
        '开放权重',
        'box',
        check(
          'open',
          'yes',
          '仅开放权重模型',
          params.has('open'),
          models.filter((model) => model.open).length,
        ),
      ) +
      group(
        '输出价格',
        'circle-dollar-sign',
        `<label>最高 <output id="output-price-label">${params.has('outprice') ? money(params.get('outprice')) : '不限'}</output> / 百万 tokens<input type="range" id="output-price-range" min="0" max="30" step="0.1" value="${Number(params.get('outprice') ?? 30)}"></label>`,
        params.has('outprice'),
      ) +
      group(
        '提供商',
        'server',
        currentHosts()
          .map((host) =>
            check(
              'host',
              host,
              esc(host),
              catalogFilter.host.split(',').includes(host),
              models.filter((model) => model.hosts.includes(host)).length,
            ),
          )
          .join(''),
      ) +
      group(
        '模型作者',
        'users',
        authors
          .map((author) =>
            check(
              'author',
              author,
              esc(author),
              catalogFilter.author.split(',').includes(author),
              models.filter((model) => model.provider === author).length,
            ),
          )
          .join(''),
        !!catalogFilter.author,
      )
    app.innerHTML = `<div class="v6-directory"><aside class="v6-filters" id="catalog-filters" aria-label="模型筛选"><div class="v6-row v6-between v6-mobile-filter-head"><h3>筛选模型</h3>${button('filters-close', '完成', 'check')}</div>${filterGroups}${button('filters-reset', '重置筛选', 'rotate-ccw', '', 'v6-btn ghost')}<div class="v6-filter-foot">${button('filters-reset', '重置筛选', 'rotate-ccw', '', 'v6-btn ghost')}${button('filters-close', '查看 <span id="filter-view-count"></span> 个结果', 'check', '', 'v6-btn primary')}</div></aside><div class="v6-model-main"><div class="v6-title"><h1>模型</h1>${link('discover', '发现模型', 'v6-btn', 'compass')}</div><div class="v6-toolbar">${search('model-search', '搜索模型…', catalogFilter.query)}<select id="model-sort" class="v6-select" aria-label="模型排序">${[
      ['newest', '最新发布'],
      ...(catalogLive ? [] : [['popular', '本周热门']]),
      ['price', '输入价格：低到高'],
      ['outputprice', '输出价格：低到高'],
      ...(catalogHasContext() ? [['context', '上下文：长到短']] : []),
      ['name', '名称 A–Z'],
    ]
      .map(
        ([value, name]) =>
          `<option value="${value}" ${value === catalogFilter.sort ? 'selected' : ''}>${name}</option>`,
      )
      .join('')}</select><select id="model-variant" class="v6-select" aria-label="模型变体">${[
      ['all', '全部变体'],
      ['standard', '标准模型'],
      ['free', '免费模型'],
    ]
      .map(
        ([value, name]) =>
          `<option value="${value}" ${value === catalogFilter.variant ? 'selected' : ''}>${name}</option>`,
      )
      .join(
        '',
      )}</select>${button('pinned-only', '已收藏', 'star', `aria-pressed="${catalogFilter.pinned}"`)}<div class="v6-segment" aria-label="模型展示方式">${[
      ['list', '列表', 'list'],
      ['table', '表格', 'table-2'],
    ]
      .map(
        ([value, label, symbol]) =>
          `<button data-action="model-view" data-value="${value}" class="${catalogFilter.view === value ? 'active' : ''}" aria-label="${label}视图" aria-pressed="${catalogFilter.view === value}">${icon(symbol)}<span class="v6-view-label">${label}</span></button>`,
      )
      .join(
        '',
      )}</div>${button('filters-open', '筛选', 'sliders-horizontal', '', 'v6-btn v6-mobile-filter')}</div>${tabs(
      ['all', 'text', 'image', 'video', 'speech', 'transcription', 'embeddings'].map((value) => {
        const count =
          value === 'all'
            ? -1
            : models.filter((model) => model.outputs.includes(value)).length
        return [
          value,
          modalityNames[value] +
            (count < 0
              ? ''
              : ` <span class="v6-count${count ? '' : ' empty'}">${count}</span>`),
          modalityIcons[value],
        ]
      }),
      catalogFilter.output,
      'output-modality',
      '输出模态',
    )}<div class="v6-result-count" id="model-count" aria-live="polite"></div><div id="model-results"></div></div></div>`
    filterModels(false)
  }
  function filterModels(sync = true) {
    if (!catalogFilter || !document.getElementById('model-results')) return
    const selected = (name) =>
      [...app.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value)
    const inputs = selected('input'),
      authors = selected('author'),
      hosts = selected('host'),
      categories = selected('category'),
      parameters = selected('parameter')
    const minContext = Number(document.getElementById('context-range')?.value || 0) * 1000
    const maxPrice = Number(document.getElementById('price-range').value)
    const maxOutput = Number(document.getElementById('output-price-range').value)
    const isOpen = selected('open').length > 0
    const query = document.getElementById('model-search').value.trim().toLowerCase()
    catalogFilter.query = query
    const list = models.filter(
      (model) =>
        (!query ||
          `${model.name} ${model.provider} ${model.slug} ${model.description}`
            .toLowerCase()
            .includes(query)) &&
        (catalogFilter.output === 'all' || model.outputs.includes(catalogFilter.output)) &&
        inputs.every((input) => model.inputs.includes(input)) &&
        (!authors.length || authors.includes(model.provider)) &&
        (!hosts.length || model.hosts.some((host) => hosts.includes(host))) &&
        (!categories.length ||
          categories.some((category) =>
            category === 'vision'
              ? model.inputs.includes('image')
              : category === 'fast'
                ? parseInt(model.latency, 10) < 500
                : category === 'code'
                  ? model.tags.includes('Code')
                  : model.category === category,
          )) &&
        parameters.every((parameter) =>
          parameter === 'tools'
            ? model.tools
            : parameter === 'structured'
              ? model.tags.includes('JSON mode')
              : model.outputs.includes('text'),
        ) &&
        (!catalogFilter.pinned || state.pins.includes(model.id)) &&
        (catalogFilter.variant === 'all' || model.variant === catalogFilter.variant) &&
        model.contextTokens >= minContext &&
        (maxPrice === 20 ||
          (!model.imagePrice && !model.audioPrice && model.inputRate <= maxPrice)) &&
        (maxOutput === 30 ||
          (!model.imagePrice && !model.audioPrice && model.outputRate <= maxOutput)) &&
        (!isOpen || model.open),
    )
    list.sort((a, b) =>
      catalogFilter.sort === 'price'
        ? a.inputRate - b.inputRate
        : catalogFilter.sort === 'outputprice'
          ? a.outputRate - b.outputRate
          : catalogFilter.sort === 'context'
            ? b.contextTokens - a.contextTokens
            : catalogFilter.sort === 'popular'
              ? b.usage - a.usage
              : catalogFilter.sort === 'name'
                ? a.name.localeCompare(b.name)
                : b.date.localeCompare(a.date),
    )
    document.getElementById('model-count').textContent = `${list.length} 个模型 · ${catalogLive ? '实时数据' : '演示数据'}`
    document.getElementById('model-count').dataset.catalogSource = catalogLive ? 'platform' : 'mock'
    const viewCount = document.getElementById('filter-view-count')
    if (viewCount) viewCount.textContent = list.length
    document.getElementById('model-results').innerHTML = !list.length
      ? empty(
          '没有找到模型',
          '调整搜索词或筛选条件后重试。',
          button('filters-reset', '重置筛选', 'rotate-ccw'),
        )
      : catalogFilter.view === 'list'
        ? `<div class="v6-models">${list.map(modelCard).join('')}</div>`
        : `<div class="v6-table-wrap"><table class="v6-table"><thead><tr><th>模型</th><th class="num">输入 $/百万</th><th class="num">输出 $/百万</th>${catalogHasContext() ? '<th class="num">上下文</th>' : ''}<th>输出模态</th><th class="num">延迟</th><th class="num">成功率</th><th class="v6-pin-cell">收藏</th></tr></thead><tbody>${list.map((model) => `<tr><td>${link('models/' + model.id, `<span class="v6-row">${logo(model.provider)}${esc(model.name)}</span>`, '')}</td><td class="num">${model.imagePrice || model.audioPrice ? modelPrice(model) : money(model.inputRate)}</td><td class="num">${model.imagePrice || model.audioPrice ? '不适用' : money(model.outputRate)}</td>${catalogHasContext() ? `<td class="num">${esc(contextLabel(model))}</td>` : ''}<td>${modalityNames[model.outputs[0]]}</td><td class="num" data-perf-latency-for="${esc(model.id)}">—</td><td class="num" data-perf-rate-for="${esc(model.id)}">—</td><td class="v6-pin-cell">${pin(model)}</td></tr>`).join('')}</tbody></table></div>`
    const contextOut = document.getElementById('context-label')
    if (contextOut) contextOut.textContent = fmtContext(minContext)
    document.getElementById('price-label').textContent = maxPrice === 20 ? '不限' : money(maxPrice)
    document.getElementById('output-price-label').textContent =
      maxOutput === 30 ? '不限' : money(maxOutput)
    if (sync) {
      const next = new URLSearchParams()
      const values = {
        q: query,
        output: catalogFilter.output === 'all' ? '' : catalogFilter.output,
        author: authors.join(','),
        provider: hosts.join(','),
        category: categories.join(','),
        inputs: inputs.join(','),
        parameters: parameters.join(','),
        sort: catalogFilter.sort === 'newest' ? '' : catalogFilter.sort,
        variant: catalogFilter.variant === 'all' ? '' : catalogFilter.variant,
        pinned: catalogFilter.pinned ? 'true' : '',
        context: minContext ? minContext / 1000 : '',
        price: maxPrice < 20 ? maxPrice : '',
        outprice: maxOutput < 30 ? maxOutput : '',
        open: isOpen ? 'true' : '',
        view: catalogFilter.view === 'table' ? 'table' : '',
      }
      Object.entries(values).forEach(([key, value]) => {
        if (value !== '') next.set(key, value)
      })
      params = next
      history.replaceState(null, '', '#/models' + (next.size ? '?' + next.toString() : ''))
    }
    loadPerfSummary(list.map((model) => model.id))
  }

  // ── 模型性能监控（/api/perf-metrics*）：有数据才渲染，报错/为空一律隐藏 ──
  function perfEntry(id) {
    const entry = perfState.map[id]
    const series = perfState.series[id] || (entry && entry.recent_success_series) || []
    if (!entry && !series.length) return null
    return { ...(entry || {}), recent_success_series: series.length ? series : entry?.recent_success_series }
  }
  function perfBadgeHTML(id) {
    const entry = perfEntry(id)
    if (!entry) return ''
    const dots = perfDots(entry.recent_success_series)
    const rate = fmtRate(entry.success_rate)
    const latency = fmtMs(entry.avg_latency_ms)
    const tps = fmtTps(entry.avg_tps)
    if (!dots && rate === '—' && latency === '—' && tps === '—') return ''
    // 只渲染有值的指标，避免整行"— — —"像没加载完
    const cells = []
    // 只有分桶点、没有成功率时只剩一根孤立色条，不单独展示
    if (rate !== '—')
      cells.push(`<span class="v6-perf-cell" data-tip="近 24 小时成功率">${dots}<b class="${successLevel(entry.success_rate)}">${rate}</b></span>`)
    if (latency !== '—') cells.push(`<span class="v6-perf-cell" data-tip="近 24 小时平均延迟">${icon('clock')}${latency}</span>`)
    if (tps !== '—') cells.push(`<span class="v6-perf-cell" data-tip="近 24 小时平均吞吐">${icon('zap')}${tps}</span>`)
    return cells.join('')
  }
  function updatePerfBadges() {
    app.querySelectorAll('[data-perf-for]').forEach((node) => {
      const slot = node.matches('.v6-perf') ? node : node.querySelector('.v6-perf')
      if (!slot) return
      const html = perfBadgeHTML(node.dataset.perfFor)
      slot.innerHTML = html
      slot.hidden = !html
    })
    app.querySelectorAll('[data-perf-latency-for]').forEach((node) => {
      const entry = perfEntry(node.dataset.perfLatencyFor)
      node.textContent = entry ? fmtMs(entry.avg_latency_ms) : '—'
    })
    app.querySelectorAll('[data-perf-rate-for]').forEach((node) => {
      const entry = perfEntry(node.dataset.perfRateFor)
      node.textContent = entry ? fmtRate(entry.success_rate) : '—'
    })
  }
  async function loadPerfSummary(ids) {
    // 仅平台目录下有真实监控；演示目录/未连接时静默跳过
    if (!catalogLive || typeof SkinAPI === 'undefined') return
    const recent = (ids || []).slice(0, 50)
    const key = recent.join(',')
    if (key === perfState.key && Date.now() - perfState.stamp < PERF_TTL) {
      updatePerfBadges()
      return
    }
    perfState.key = key
    perfState.stamp = Date.now()
    // 筛选输入每击键都会走到这里：300ms 合并为最后一次参数的请求
    clearTimeout(perfState.timer)
    const seq = (perfState.seq = (perfState.seq || 0) + 1)
    perfState.timer = setTimeout(async () => {
      try {
        const data = await SkinAPI.perfMetricsSummary({ hours: 24, recentModels: recent })
        // 已有更新的请求发出时，丢弃过期响应
        if (seq !== perfState.seq) return
        const map = {}
        ;(Array.isArray(data.models) ? data.models : []).forEach((m) => {
          if (m && m.model_name) map[m.model_name] = m
        })
        perfState.map = map
        perfState.series =
          data.recent_success_series && typeof data.recent_success_series === 'object'
            ? data.recent_success_series
            : {}
      } catch {
        if (seq !== perfState.seq) return
        // 401/403（pricing 未公开且未登录）或监控未启用：一律隐藏，不打扰界面
        perfState.map = {}
        perfState.series = {}
      }
      if (route === 'models') updatePerfBadges()
    }, 300)
  }

  function apiBaseURL() {
    return (typeof SkinAPI === 'undefined' ? 'http://localhost:3000' : SkinAPI.publicBase()) + '/v1'
  }
  function codeExample(model, language = 'python') {
    const baseURL = apiBaseURL()
    const endpoint =
      model.outputs[0] === 'embeddings'
        ? 'embeddings'
        : model.outputs[0] === 'image'
          ? 'images/generations'
          : model.outputs[0] === 'transcription'
            ? 'audio/transcriptions'
            : 'chat/completions'
    const payload =
      model.outputs[0] === 'embeddings'
        ? { model: model.slug, input: 'Hello, world!' }
        : model.outputs[0] === 'image'
          ? { model: model.slug, prompt: 'A sunlit mountain landscape' }
          : { model: model.slug, messages: [{ role: 'user', content: 'Hello, world!' }] }
    if (language === 'curl')
      return endpoint === 'audio/transcriptions'
        ? `curl ${baseURL}/${endpoint} \\\n  -H "Authorization: Bearer $TOKENFLUX_API_KEY" \\\n  -F "model=${model.slug}" \\\n  -F "file=@audio.wav"`
        : `curl ${baseURL}/${endpoint} \\\n  -H "Authorization: Bearer $TOKENFLUX_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(payload, null, 2)}'`
    if (language === 'javascript')
      return `import OpenAI${endpoint === 'audio/transcriptions' ? ', { toFile }' : ''} from 'openai'\n${endpoint === 'audio/transcriptions' ? "import fs from 'node:fs'\n" : ''}\nconst client = new OpenAI({\n  baseURL: '${baseURL}',\n  apiKey: process.env.TOKENFLUX_API_KEY\n})\n\nconst response = await client.${endpoint === 'embeddings' ? 'embeddings.create' : endpoint === 'images/generations' ? 'images.generate' : endpoint === 'audio/transcriptions' ? 'audio.transcriptions.create' : 'chat.completions.create'}(${endpoint === 'audio/transcriptions' ? `{ model: '${model.slug}', file: fs.createReadStream('audio.wav') }` : JSON.stringify(payload, null, 2)})\nconsole.log(response)`
    return `import os\nfrom openai import OpenAI\n\nclient = OpenAI(\n    base_url="${baseURL}",\n    api_key=os.environ["TOKENFLUX_API_KEY"]\n)\n\nresponse = client.${endpoint === 'embeddings' ? 'embeddings.create' : endpoint === 'images/generations' ? 'images.generate' : endpoint === 'audio/transcriptions' ? 'audio.transcriptions.create' : 'chat.completions.create'}(\n    model="${model.slug}",\n    ${endpoint === 'embeddings' ? 'input="Hello, world!"' : endpoint === 'images/generations' ? 'prompt="A sunlit mountain landscape"' : endpoint === 'audio/transcriptions' ? 'file=open("audio.wav", "rb")' : 'messages=[{"role": "user", "content": "Hello, world!"}]'}\n)\nprint(response)`
  }
  // 文档页兜底示例模型：真实目录为空时代替 models[0] 生成调用示例
  const docsSampleModel = { id: '__docs-sample__', slug: 'provider/model-name', outputs: ['text'] }
  // T6.3/DT-04：≤2KB 本地语法高亮——注释/字符串/键名/关键字/数字五类，包 <i class="tk-*">
  function highlightCode(code, lang) {
    const KEYWORDS = {
      python: 'import|from|def|return|if|else|elif|for|in|with|as|class|print|await|async|open|None|True|False',
      javascript: 'import|from|const|let|var|await|async|function|return|new|if|else|for|of|console|process',
      curl: 'curl|POST|GET|PUT|DELETE|PATCH',
    }
    const parts = [
      ['com', lang === 'curl' ? '(?!)' : lang === 'python' ? '#[^\\n]*' : '//[^\\n]*|/\\*[\\s\\S]*?\\*/'],
      ['str', '"(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`'],
      // curl 的 flag 与 URL 要先于键名匹配，否则 https: 会被键名截走
      ...(lang === 'curl' ? [['kw', 'https?://[^\\s"\']+|--?[\\w-]+']] : []),
      ['key', '[\\w$][\\w$-]*(?==|:)'],
      ['kw', `\\b(?:${KEYWORDS[lang] || '(?!a)a'})\\b`],
      ['num', '\\b\\d[\\d.]*\\b'],
    ]
    const re = new RegExp(parts.map(([, p]) => `(${p})`).join('|'), 'g')
    const names = parts.map(([name]) => name)
    let out = ''
    let last = 0
    let m
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index))
      const i = m.findIndex((g, j) => j > 0 && g !== undefined) - 1
      out += `<i class="tk-${names[i]}">${esc(m[0])}</i>`
      last = m.index + m[0].length
      if (!m[0]) re.lastIndex++
    }
    return out + esc(code.slice(last))
  }
  function codeBlock(model) {
    return `<div class="v6-code" data-code-model="${esc(model.id)}"><div class="v6-code-head"><div class="v6-segment" aria-label="代码语言">${['python', 'javascript', 'curl'].map((language, index) => `<button type="button" data-action="code-language" data-value="${language}" aria-pressed="${index === 0}" class="${index === 0 ? 'active' : ''}">${language === 'curl' ? 'cURL' : language === 'python' ? 'Python' : 'JavaScript'}</button>`).join('')}</div>${iconButton('copy-code', '复制代码', 'copy')}</div><pre><code>${highlightCode(codeExample(model), 'python')}</code></pre></div>`
  }
  function providerTable(model, sort = 'latency', percentile = 50) {
    const live = !!model.live
    const rows = model.hosts.map((name, index) => ({
      name,
      input: model.inputRate * (1 + index * 0.015),
      output: model.outputRate * (1 + index * 0.015),
      latency: (Number.parseInt(model.latency, 10) || 0) * (1 + index * 0.12) * (percentile / 50),
      throughput: Math.max(1, (Number.parseInt(model.throughput, 10) || 1) - index * 6),
      uptime: (Number.parseFloat(model.uptime) || 0) - index * 0.01,
    }))
    rows.sort((a, b) =>
      sort === 'throughput' || sort === 'uptime' ? b[sort] - a[sort] : a[sort] - b[sort],
    )
    // 平台(live)模型没有真实遥测数据，表格只保留 提供商/输入/输出 三列
    const columns = [
      ['input', '输入 $/百万'],
      ['output', '输出 $/百万'],
      ...(live
        ? []
        : [
            ['latency', '延迟'],
            ['throughput', '吞吐量'],
            ['uptime', '可用性'],
          ]),
    ]
    const metricCells = (row) =>
      live
        ? ''
        : `<td class="v6-col-metric num" data-label="延迟">${(row.latency / 1000).toFixed(2)} s</td><td class="v6-col-metric num" data-label="吞吐量">${row.throughput} ${model.imagePrice ? 'img/s' : model.audioPrice ? 'sec/s' : 'tok/s'}</td><td class="v6-col-metric" data-label="可用性"><span class="v6-badge success">${pct(row.uptime)}</span></td>`
    return `<div class="v6-table-wrap"><table class="v6-table v6-mobile-cards"><thead><tr><th>提供商</th>${columns
      .map(
        ([value, label]) =>
          `<th class="${['latency', 'throughput', 'uptime'].includes(value) ? 'v6-col-metric' : ''}${value === 'uptime' ? '' : ' num'}"><button data-action="provider-sort" data-value="${value}" aria-label="按${label}排序">${label} ${icon('arrow-down-up')}</button></th>`,
      )
      .join(
        '',
      )}</tr></thead><tbody>${rows.map((row) => `<tr><td data-label="提供商"><button type="button" class="v6-provider-name" data-action="provider-info" data-name="${esc(row.name)}" data-model="${esc(model.id)}">${logo(row.name)}${esc(row.name)}</button></td><td class="num" data-label="输入 $/百万">${model.imagePrice || model.audioPrice ? modelPrice(model) : money(row.input)}</td><td class="num" data-label="输出 $/百万">${model.imagePrice || model.audioPrice ? '不适用' : money(row.output)}</td>${metricCells(row)}</tr>`).join('')}</tbody></table></div>`
  }
  function renderDetail(id) {
    const model = getModel(id)
    if (!model) {
      app.innerHTML = `<div class="v6-shell">${empty(catalogReady ? '没有这个模型' : '正在读取模型', catalogReady ? '它不在当前目录中。' : '正在加载目录。', catalogReady ? link('models', '返回目录', 'v6-btn') : '')}</div>`
      return
    }
    // 演示目录：性能/可用性区段展示演示指标；平台(live)目录：骨架区段由 loadModelPerf 填真实数据，取不到则整段移除
    const telemetry = !model.live
    const sections = [
      ['providers', '提供商', 'server'],
      ['pricing', '价格', 'circle-dollar-sign'],
      ['performance', '性能', 'zap'],
      ['uptime', '可用性', 'activity'],
      ['api', 'API', 'code'],
      ['faq', '常见问题', 'circle-help'],
      ['explore', '相关模型', 'compass'],
    ]
    app.innerHTML = `<div class="v6-shell"><header class="v6-detail-head"><div class="v6-title"><div><div class="v6-row">${logo(model.provider, 'lg')}<h1>${esc(model.provider + ': ' + model.name)}</h1></div><div class="v6-row v6-slug"><button type="button" class="v6-slug-pill" data-action="copy" data-copy="${esc(model.slug)}" aria-label="复制模型 ID" data-tip="复制模型 ID"><span class="v6-slug-text">${esc(model.slug)}</span><span class="v6-slug-ico" data-copy-icon>${icon('copy')}</span></button>${pin(model)}</div></div><div class="v6-row v6-wrap">${link('models/' + encodeURIComponent(model.id) + '?section=api', '调用示例', 'v6-btn', 'code')}${link('console/keys', '获取 API Key', 'v6-btn primary', 'key-round')}</div></div>${model.description ? `<p class="v6-detail-description">${esc(model.description)}</p>` : ''}<div class="v6-stats">${stat('输入 / 输出模态', `<span class="v6-row">${model.inputs.map((value) => `<span title="${modalityNames[value]}">${icon(modalityIcons[value])}</span>`).join('')}${icon('arrow-right')}${icon(modalityIcons[model.outputs[0]])}</span>`)}${stat('输入 / 输出价格', model.imagePrice || model.audioPrice ? modelPrice(model) : money(model.inputRate) + ' / ' + money(model.outputRate), model.imagePrice || model.audioPrice ? '' : '每百万 tokens')}${hasContext(model) ? stat('上下文长度', contextLabel(model)) : ''}${model.date ? stat('发布日期', model.date) : ''}</div></header><div class="v6-section-layout">${sectionNav(sections)}<div>${section('providers', '提供商', `此模型由 ${model.hosts.length} 个提供商提供服务。${telemetry ? '可按价格、延迟、吞吐和可用性查看路由。' : '价格来自当前计费配置。'}`, `<div class="v6-toolbar">${telemetry ? `<label class="v6-row v6-small v6-ml-auto">延迟分位数<select class="v6-select" id="provider-percentile"><option value="50">P50</option><option value="90">P90</option><option value="99">P99</option></select></label>` : ''}</div><div id="provider-table" data-sort="latency">${providerTable(model)}</div>`, telemetry ? '<span class="v6-badge">演示指标</span>' : '')}${section('pricing', '价格', `模型费率与单次调用成本。${model.live ? '费率来自当前计费配置。' : '价格使用演示目录中的固定数据。'}`, `<div class="v6-stat-band"><div><small>${model.imagePrice ? '每张图像' : model.audioPrice ? '每分钟音频' : '输入 / 百万 tokens'}</small><strong>${kpi(money(model.imagePrice || model.audioPrice || model.inputRate))}</strong></div>${!model.imagePrice && !model.audioPrice ? `<div><small>输出 / 百万 tokens</small><strong>${kpi(money(model.outputRate))}</strong></div>` : ''}</div>${!model.imagePrice && !model.audioPrice ? `<div class="v6-estimator">输入 <span class="v6-input-suffix"><input class="v6-input" type="number" min="0" max="10000000" id="estimate-input" value="2000" aria-label="输入 tokens"><em>tokens</em></span> · 输出 <span class="v6-input-suffix"><input class="v6-input" type="number" min="0" max="1000000" id="estimate-output" value="800" aria-label="输出 tokens" ${model.outputs[0] === 'embeddings' ? 'disabled' : ''}><em>tokens</em></span><span class="v6-estimator-result"><small>预计单次成本</small><strong id="estimate-cost" class="v6-num">${kpi(money((model.inputRate * 2000 + model.outputRate * 800) / 1e6))}</strong></span></div>` : ''}`)}${telemetry ? section('performance', '性能', '吞吐量越高，生成越快；首 token 延迟越低，等待越短。', `<div class="v6-stat-band"><div><small>吞吐量</small><strong>${kpi(model.throughput)}</strong></div><div><small>首 token 延迟</small><strong>${kpi(model.latency)}</strong></div></div><div class="v6-row v6-between"><h3>吞吐量趋势</h3><select class="v6-select" data-chart-period="detail-performance" aria-label="性能统计周期"><option value="7">最近 7 天</option><option value="30">最近 30 天</option></select></div>${chart('detail-performance', 'performance', 'detail')}`) : ''}${model.live ? section('performance', '性能', '实测指标，按分组聚合。', `<div id="model-perf">${skeletonRows(4)}</div>`) : ''}${telemetry ? section('uptime', '可用性', '最近 30 天的服务状态，所有指标为演示样本。', `<div class="v6-row v6-between"><h3>${kpi(model.uptime)}</h3><span class="v6-badge green">服务正常</span></div><div class="v6-uptime" role="img" aria-label="最近 30 天每日可用性">${Array.from({ length: 30 }, (_, index) => { const day = new Date(Date.now() - (29 - index) * 864e5); const tip = `${day.getMonth() + 1}/${day.getDate()}：${index === 12 ? '99.5%' : '100%'}`; return `<i data-tip="${tip}" class="${index === 12 ? 'warning' : ''}"></i>` }).join('')}</div><div class="v6-row v6-between v6-small v6-muted"><span>30 天前</span><span>今天</span></div>${uptimeLegend()}`) : ''}${model.live ? section('uptime', '可用性', '分时段实测成功率。', `<div id="model-uptime">${skeletonRows(2)}</div>`) : ''}${section('api', 'API 调用', '使用 OpenAI 兼容 SDK。以下 Base URL 为示例地址，接入时替换为你的实际服务地址。', codeBlock(model))}${section('faq', '常见问题', '', `<details class="v6-faq"><summary>这个模型支持哪些输入？${icon('chevron-right')}</summary><p>支持${model.inputs.map((value) => modalityNames[value]).join('、')}输入，输出类型为${modalityNames[model.outputs[0]]}。</p></details><details class="v6-faq"><summary>如何选择提供商？${icon('chevron-right')}</summary><p>可在提供商列表中查看性能指标。实际请求的路由取决于服务端配置、可用性和账户策略。</p></details><details class="v6-faq"><summary>免费模型有什么限制？${icon('chevron-right')}</summary><p>免费变体通常有请求频率和每日用量限制，适合试验和评估。具体限制以服务提供商为准。</p></details>`)}${section(
      'explore',
      '相关模型',
      '',
      `<div class="v6-models">${
        models
          .filter((item) => item.id !== model.id && item.outputs[0] === model.outputs[0])
          .slice(0, 3)
          .map(modelCard)
          .join('') ||
        empty('还没有同类模型', '浏览目录中的其他模型。', link('models', '浏览全部模型', 'v6-btn'))
      }</div>`,
    )}</div></div></div>`
    if (model.live) loadModelPerf(model.id)
  }

  // 详情页实测指标：/api/perf-metrics?model=&hours= —— 取不到数据时整段移除（含左侧导航项）
  let detailPerfHours = 24
  function removePerfSections() {
    delete liveChartData['detail-perf-tps']
    ;['performance', 'uptime'].forEach((id) => {
      document.getElementById(id)?.remove()
      app.querySelector(`[data-section="${id}"]`)?.remove()
    })
  }
  function perfHourLabel(ts, hours) {
    const d = new Date(Number(ts) * 1000)
    const hh = String(d.getHours()).padStart(2, '0') + ':00'
    return hours > 24 ? `${d.getMonth() + 1}/${d.getDate()} ${hh}` : hh
  }
  async function loadModelPerf(id, hours) {
    const win = Number(hours) || detailPerfHours || 24
    detailPerfHours = win
    liveChartData['detail-perf-tps'] = { state: 'loading' }
    try {
      const data = await SkinAPI.perfMetrics({ model: id, hours: win })
      // 已离开该详情页则丢弃结果
      if (routeModelId() !== id) return
      const summary = data.summary
      const series = Array.isArray(data.series) ? data.series : []
      const groups = Array.isArray(data.groups) ? data.groups : []
      if (!summary || !series.length) throw new Error('no perf data')
      const perfEl = document.getElementById('model-perf')
      const upEl = document.getElementById('model-uptime')
      if (!perfEl || !upEl) return
      perfEl.innerHTML = `<div class="v6-stat-band"><div><small>成功率</small><strong class="${successLevel(summary.success_rate)}">${kpi(fmtRate(summary.success_rate))}</strong></div><div><small>平均延迟</small><strong>${kpi(fmtMs(summary.avg_latency_ms))}</strong></div><div><small>平均吞吐</small><strong>${kpi(fmtTps(summary.avg_tps))}</strong></div></div>${
        groups.length
          ? `<div class="v6-table-wrap"><table class="v6-table"><thead><tr><th>分组</th><th class="num">吞吐</th><th class="num">首 token 延迟</th><th class="num">端到端延迟</th><th class="num">成功率</th><th>近时段表现</th></tr></thead><tbody>${groups
              .map(
                (g) =>
                  `<tr><td>${esc(g.group || 'default')}</td><td class="num">${fmtTps(g.avg_tps)}</td><td class="num">${fmtMs(g.avg_ttft_ms)}</td><td class="num">${fmtMs(g.avg_latency_ms)}</td><td class="num"><b class="${successLevel(g.success_rate)}">${fmtRate(g.success_rate)}</b></td><td>${perfDots(g.series)}</td></tr>`,
              )
              .join('')}</tbody></table></div>`
          : ''
      }<div class="v6-row v6-between"><h3>吞吐趋势</h3><select class="v6-select" id="model-perf-hours" aria-label="统计窗口">${[
        [24, '最近 24 小时'],
        [72, '最近 3 天'],
        [168, '最近 7 天'],
      ]
        .map(([v, n]) => `<option value="${v}" ${win === v ? 'selected' : ''}>${n}</option>`)
        .join('')}</select></div>${chart('detail-perf-tps', 'perf-live', 'detail')}`
      const level = successLevel(summary.success_rate)
      upEl.innerHTML = `<div class="v6-row v6-between"><h3 class="${level}">${kpi(fmtRate(summary.success_rate))}</h3><span class="v6-badge ${level === 'excellent' || level === 'good' ? 'green' : ''}">${level === 'excellent' || level === 'good' ? '服务正常' : level === 'warning' ? '轻微波动' : '可用性异常'}</span></div><div class="v6-uptime" role="img" aria-label="最近 ${win} 小时分时段成功率">${series
        .map(
          (p) =>
            `<i data-tip="${perfHourLabel(p.ts, win)}：${pct(p.success_rate)}" class="${successLevel(p.success_rate)}"></i>`,
        )
        .join('')}</div><div class="v6-row v6-between v6-small v6-muted"><span>${perfHourLabel(data.window_start, win)}</span><span>${perfHourLabel(data.window_end, win)}</span></div>${uptimeLegend()}`
      liveChartData['detail-perf-tps'] = {
        state: 'ok',
        buckets: series.map((p) => Number(p.avg_tps) || 0),
        series: [1],
        unit: ' t/s',
        times: series.map((p) => perfHourLabel(p.ts, win)),
      }
      app.querySelectorAll('.v6-chart').forEach((node) => chartObserver?.observe(node))
      drawCharts()
    } catch {
      if (routeModelId() !== id) return
      removePerfSections()
    }
  }

  function renderDiscover() {
    const leaders = [...models]
      .filter((model) => model.outputs.includes('text') && model.variant !== 'free')
      .sort((a, b) => b.usage - a.usage)
    // 精选卡片：生产环境按 config.featuredModels 选择；目录中不存在的自动跳过（修复真实目录崩溃）
    const demoDefs = [
      ['最受欢迎', 'deepseek-v3', 'chart-no-axes-combined', '9.1B tokens / 周'],
      ['快速响应', 'claude-haiku', 'zap', '310ms 首 token 延迟'],
      ['复杂推理', 'claude-3.7', 'brain', '推理与工具调用'],
      ['长上下文', 'gemini-2.5', 'scan-text', '1M 上下文'],
      ['免费尝试', 'qwen-3-free', 'gift', '$0 输入 / 输出'],
      ['图像创作', 'flux-1.1-pro', 'image', '$0.04 / 张图像'],
    ]
    const featuredIds =
      Array.isArray(appConfig.featuredModels) && appConfig.featuredModels.length
        ? appConfig.featuredModels
        : demoDefs.map(([, id]) => id)
    const featured = featuredIds
      .map((id) => getModel(id))
      .filter(Boolean)
      .map((model) => {
        const demo = catalogLive ? undefined : demoDefs.find(([, id]) => id === model.id)
        return {
          model,
          label: demo ? demo[0] : model.provider || '精选',
          symbol: demo ? demo[2] : 'star',
          metric: demo ? demo[3] : modelPrice(model),
        }
      })
    // T6.6 / DS-03：速览卡固定三级层级 —— 标签 12px → 名称 16/600 → 指标 13px（tnum）
    const pickCard = (item) =>
      `<a class="v6-item v6-pick" href="#/models/${esc(item.model.id)}"><span class="v6-pick-label">${icon(item.symbol)}${esc(item.label)}</span><span class="v6-pick-name">${logo(item.model.provider)}<strong>${esc(item.model.name)}</strong></span><span class="v6-pick-metric">${esc(item.metric)}</span></a>`
    const featuredGrid = featured.length
      ? `<div class="v6-grid-3">${featured.map(pickCard).join('')}</div>`
      : ''
    // DS-01：live 目录下用真实目录数据生成速览（最新上线 / 最长上下文 / 最低价格 + 模态统计）
    const leadSection = catalogLive
      ? (() => {
          const newest = [...models]
            .filter((model) => model.date)
            .sort((a, b) => String(b.date).localeCompare(String(a.date)))[0]
          const longest = [...models].sort(
            (a, b) => (b.contextTokens || 0) - (a.contextTokens || 0),
          )[0]
          const cheapest = [...models].sort(
            (a, b) => (a.inputRate || 0) - (b.inputRate || 0),
          )[0]
          const picks = [
            newest && ['star', '最新上线', newest, String(newest.date)],
            longest && ['scan-text', '最长上下文', longest, `${longest.context} 上下文`],
            cheapest && ['tag', '最低价格', cheapest, modelPrice(cheapest)],
          ].filter(Boolean)
          const modalityCount = models.reduce((map, model) => {
            const key = model.outputs[0] || 'text'
            map[key] = (map[key] || 0) + 1
            return map
          }, {})
          return `<section class="v6-home-band"><div class="v6-stat-band"><div><small>目录模型</small><strong>${kpi(models.length)}</strong></div>${Object.entries(
            modalityCount,
          )
            .map(([key, count]) => `<div><small>${modalityNames[key] || key}输出</small><strong>${kpi(count)}</strong></div>`)
            .join('')}<div><small>提供商</small><strong>${kpi(new Set(models.map((model) => model.provider)).size)}</strong></div></div><div class="v6-grid-3 v6-picks">${picks
            .map(([symbol, label, model, metric]) => pickCard({ model, symbol, label, metric }))
            .join('')}</div></section>`
        })()
      : `<section class="v6-discover-lead"><div><div class="v6-eyebrow">本周热门</div><h2>开发者正在使用<br>哪些模型？</h2><p class="v6-muted">探索通用对话、编程和推理模型，查看上下文、费率与提供商。</p><span class="v6-badge">演示数据 · 最近 7 天</span></div><div>${rankedRows(leaders.slice(0, 5))}</div></section>`
    // T6.6：按模态分组网格 —— 每卡显示数量与代表模型（用量前 3），全部取自实时目录
    const modalityGroups = Object.entries(
      models.reduce((map, model) => {
        const key = model.outputs[0] || 'text'
        ;(map[key] ||= []).push(model)
        return map
      }, {}),
    ).sort((a, b) => b[1].length - a[1].length)
    const modalitySection = section(
      'discover-modality',
      '按模态浏览',
      '按输出模态查看模型分布与代表模型。',
      `<div class="v6-grid-3">${modalityGroups
        .map(([key, list]) => {
          const reps = [...list].sort((a, b) => b.usage - a.usage).slice(0, 3)
          return `<a class="v6-item v6-mod" href="#/models?output=${key}"><div class="v6-mod-head"><span class="v6-mod-icon">${icon(modalityIcons[key] || 'layers')}</span><h3>${modalityNames[key] || key}</h3><span class="v6-mod-count">${list.length}</span></div><div class="v6-mod-reps">${reps
            .map((model) => `<span class="v6-mod-rep">${logo(model.provider)}<span>${esc(model.name)}</span></span>`)
            .join('')}</div><span class="v6-link">查看全部 ${list.length} 个 →</span></a>`
        })
        .join('')}</div>`,
    )
    // T6.6：按提供商一组横条 —— 承载模型数占头名比例（取前 8）
    const providerCounts = currentHosts()
      .map((name) => [name, models.filter((model) => model.hosts.includes(name)).length])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
    const providerMax = providerCounts[0]?.[1] || 1
    const providerSection = section(
      'discover-providers',
      '按提供商',
      '目录中各提供商承载的模型数量。',
      `<div class="v6-prov-bars">${providerCounts
        .map(
          ([name, count]) =>
            `<a class="v6-prov-row" href="#/models?provider=${encodeURIComponent(name)}"><span class="v6-prov-name">${logo(name)}<span>${esc(name)}</span></span><span class="v6-progress v6-prov-track"><i data-w="${Math.round((count / providerMax) * 100)}%"></i></span><span class="v6-prov-num">${count}</span></a>`,
        )
        .join('')}</div>`,
    )
    app.innerHTML = `<div class="v6-shell"><div class="v6-title"><div><h1>发现模型</h1><p>从热门用量、任务需求和运行表现找到合适的起点。</p></div>${link('models', `浏览全部 ${models.length} 个模型`, 'v6-btn', '', 'arrow-right')}</div>${leadSection}${featuredGrid}${modalitySection}${providerSection}<section class="v6-home-band"><div class="v6-title"><h2>按任务探索</h2></div><div class="v6-grid-3">${[
      ['code', '编程与 Agent', '代码生成、工具调用和结构化输出'],
      ['reasoning', '深度推理', '复杂问题、数学分析和多步骤任务'],
      ['vision', '多模态理解', '理解图像、文档与长上下文'],
    ]
      .map(
        ([category, title, description]) =>
          `<a class="v6-item" href="#/models?category=${category}"><h3>${title}</h3><p>${description}</p><span class="v6-link">探索模型 →</span></a>`,
      )
      .join('')}</div></section></div>`
  }

  async function loadRankings(period) {
    // 接入真实排行榜：Platform /api/rankings?period=
    const box = document.getElementById('rankings-live')
    if (!box) return
    try {
      const data = await SkinAPI.rankings(period)
      const list = data.models || data.items || data.data || []
      // T6.8：份额 = 该项 tokens / 总量；总量为 0 时全部按 0 处理
      const total = list.reduce((sum, item) => sum + Number(item.quota || item.tokens || 0), 0)
      box.innerHTML = list.length
        ? `<div class="v6-table-wrap"><table class="v6-table"><thead><tr><th class="v6-rank-col">#</th><th>模型</th><th class="num">Tokens</th><th class="v6-share-col">份额</th><th class="num">请求数</th></tr></thead><tbody>${list.slice(0, 50).map((item, i) => { const share = total ? (Number(item.quota || item.tokens || 0) / total) * 100 : 0; return `<tr><td class="v6-rank-col">${rankBadge(i)}</td><td>${esc(item.model_name || item.name || item.model || '—')}</td><td class="num">${fmtTokens(item.quota || item.tokens || 0)}</td><td class="num"><span class="v6-share"><span class="v6-progress"><i data-w="${share.toFixed(1)}%"></i></span><span class="v6-num">${share.toFixed(1)}%</span></span></td><td class="num">${Number(item.count || item.requests || 0).toLocaleString()}</td></tr>` }).join('')}</tbody></table></div>`
        : empty('还没有排行数据', '当前还没有排行统计。')
    } catch (error) {
      box.innerHTML = errorBox(
        '排行榜加载失败',
        '当前无法获取排行数据，请稍后重试。',
        `<button class="v6-btn" data-action="retry-rankings" data-period="${esc(period)}">${icon('refresh-cw')}重试</button>`,
        error.message,
      )
    }
  }
  function renderRankings() {
    const period = params.get('period') || 'week'
    const metric = params.get('metric') || 'usage'
    const selectedOutput = params.get('output') || 'text'
    const list = models
      .filter((model) => model.outputs.includes(selectedOutput))
      .sort((a, b) =>
        metric === 'speed'
          ? parseInt(b.throughput, 10) - parseInt(a.throughput, 10)
          : b.usage - a.usage,
      )
    const multiplier = period === 'day' ? 0.16 : period === 'month' ? 4.4 : 1
    const totalUsage = list.reduce((sum, model) => sum + model.usage, 0)
    // T6.8：行内份额条（tnum 百分比），徽标用 rankBadge()
    const shareCell = (model) => {
      const share = totalUsage ? (model.usage / totalUsage) * 100 : 0
      return `<span class="v6-share"><span class="v6-progress"><i data-w="${share.toFixed(1)}%"></i></span><span class="v6-num">${share.toFixed(1)}%</span></span>`
    }
    const demoSections = [
      ['top-models', '热门模型', 'chart-no-axes-combined'],
      ['leaderboard', '模型榜单', 'trophy'],
      ['market-share', '作者份额', 'chart-pie'],
      ['fastest', '最快模型', 'zap'],
    ]
    // RK-04：h1 → tabs → 实时榜在前；Platform 目录下本地演示榜整体隐藏（RK-01~03 一并消失）
    const liveSection = `${section(
      'rankings-live',
      '实时排行',
      catalogLive ? '实时用量统计。' : '实时用量统计（本地榜单为演示数据）。',
      `<div id="rankings-live">${skeletonRows(5)}</div>`,
    )}`
    const demoBlock = catalogLive
      ? ''
      : `${section(
          'top-models',
          '热门模型',
          '不同模型的用量变化。',
          `<div class="v6-toolbar"><div class="v6-segment v6-ml-auto">${button('chart-scale', '线性', '', 'data-value="linear" aria-pressed="true"', 'active')}${button('chart-scale', '对数', '', 'data-value="log" aria-pressed="false"', '')}</div></div>${chart('rankings-usage')}<div class="v6-legend">${list
            .slice(0, 5)
            .map(
              (model, index) =>
                `<span><i data-series="${index}"></i>${esc(model.name)}</span>`,
            )
            .join('')}</div>`,
        )}${section('leaderboard', '模型榜单', '', `<div class="v6-toolbar"><label class="v6-row v6-small v6-ml-auto">排序<select class="v6-select" id="ranking-metric"><option value="usage" ${metric === 'usage' ? 'selected' : ''}>Token 用量</option><option value="speed" ${metric === 'speed' ? 'selected' : ''}>吞吐量</option></select></label></div>${
          list.length
            ? `<div class="v6-table-wrap"><table class="v6-table"><thead><tr><th>排名</th><th>模型</th><th class="num">${metric === 'speed' ? '吞吐量' : 'Tokens'}</th><th class="v6-share-col">份额</th><th class="num">变化</th></tr></thead><tbody>${list.map((model, index) => `<tr><td class="v6-rank-cell">${rankBadge(index)}</td><td>${link('models/' + model.id, `<span class="v6-row">${logo(model.provider)}<span>${esc(model.name)}<div class="v6-muted">${esc(model.provider)}</div></span></span>`, '')}</td><td class="num">${metric === 'speed' ? model.throughput : fmtTokens(model.usage * multiplier)}</td><td class="num">${shareCell(model)}</td><td class="num"><span class="v6-delta">+${(8 + index * 3) * (period === 'month' ? 2 : 1)}%</span></td></tr>`).join('')}</tbody></table></div>`
            : empty('没有可排名的模型', '当前模态下目录为空，换个输出类型试试。')
        }`)}${section(
          'market-share',
          '模型作者份额',
          '当前模态下各作者的 Token 用量占比。',
          totalUsage
            ? `<div class="v6-stack">${[...new Set(list.map((model) => model.provider))]
                .map((provider) => {
                  // RK-01：总量为 0 时份额按 0 处理，绝不出现 NaN%
                  const share = totalUsage
                    ? (list
                        .filter((model) => model.provider === provider)
                        .reduce((sum, model) => sum + model.usage, 0) /
                        totalUsage) *
                      100
                    : 0
                  return `<div><div class="v6-row v6-between"><span>${esc(provider)}</span><span class="v6-num">${share.toFixed(1)}%</span></div><div class="v6-progress"><i data-w="${share}%"></i></div></div>`
                })
                .join('')}</div>`
            : empty('还没有用量数据', '当前目录还没有可统计的用量。'),
        )}${section('fastest', '最快模型', '按当前模态的生成吞吐量排序。', list.length ? rankedRows([...list].sort((a, b) => parseInt(b.throughput, 10) - parseInt(a.throughput, 10)).slice(0, 5), 'speed') : empty('没有可排名的模型', '当前模态下目录为空。'))}`
    const navItems = catalogLive
      ? [['rankings-live', '实时排行', 'activity']]
      : [...demoSections, ['rankings-live', '实时排行', 'activity']]
    app.innerHTML = `<div class="v6-shell"><div class="v6-title"><div><h1>AI 模型排行榜</h1><p>按模型用量观察趋势，发现热门模型与提供商。</p></div>${catalogLive ? '' : '<span class="v6-badge">本地演示数据 · 非实时榜单</span>'}</div><div class="v6-toolbar v6-rank-toolbar">${tabs(
      ['text', 'image', 'transcription', 'embeddings'].map((value) => [
        value,
        modalityNames[value],
        modalityIcons[value],
      ]),
      selectedOutput,
      'ranking-output',
      '排行榜模态',
    )}<div class="v6-ml-auto">${tabs(
      [
        ['day', '24 小时'],
        ['week', '7 天'],
        ['month', '30 天'],
      ],
      period,
      'ranking-period',
      '统计周期',
    )}</div></div><div class="v6-section-layout">${sectionNav(navItems)}<div>${liveSection}${demoBlock}</div></div></div>`
    loadRankings(period)
  }

  // ── 服务状态页（/api/uptime/status，公开接口）：按 Uptime Kuma 分组渲染监控项 ──
  function renderStatus() {
    app.innerHTML = `<div class="v6-shell"><div class="v6-title"><div><h1>服务状态</h1><p>各服务的实时可用性。</p></div><span class="v6-badge" id="status-pill">检查中…</span></div><div id="uptime-status">${skeletonRows(4)}</div></div>`
    loadUptimeStatus()
    clearInterval(statusTimer)
    statusTimer = setInterval(loadUptimeStatus, 60000)
  }
  async function loadUptimeStatus() {
    // 离开状态页后首个 tick 自清
    if (route !== 'status') {
      clearInterval(statusTimer)
      statusTimer = null
      return
    }
    const box = document.getElementById('uptime-status')
    if (!box) return
    try {
      const groups = await SkinAPI.uptimeStatus()
      if (route !== 'status' || !document.getElementById('uptime-status')) return
      const pill = document.getElementById('status-pill')
      if (!groups.length) {
        box.innerHTML = empty('未配置监控', '后台尚未配置服务状态监控。', '', 'activity')
        pill?.remove()
        return
      }
      const all = groups.flatMap((g) => (Array.isArray(g.monitors) ? g.monitors : []))
      const down = all.filter((m) => Number(m.status) !== 1).length
      if (pill) {
        pill.textContent = down ? `${down} 项异常` : '全部服务正常'
        pill.classList.toggle('green', !down)
      }
      const statusName = { 0: '不可用', 1: '正常', 2: '等待中', 3: '维护中' }
      box.innerHTML = groups
        .map((g) => {
          const monitors = Array.isArray(g.monitors) ? g.monitors : []
          return card(
            esc(g.categoryName || '默认分组'),
            `${monitors.length} 项监控`,
            monitors.length
              ? `<div class="v6-table-wrap"><table class="v6-table"><thead><tr><th>状态</th><th>监控项</th><th>分组</th><th class="num">24 小时可用率</th></tr></thead><tbody>${monitors
                  .map(
                    (m) =>
                      `<tr><td><span class="v6-status-dot s${Number(m.status)}" data-tip="${statusName[Number(m.status)] || '未知'}"></span></td><td>${esc(m.name || '—')}</td><td>${esc(m.group || '—')}</td><td class="num">${pct(Number(m.uptime || 0) * 100)}</td></tr>`,
                  )
                  .join('')}</tbody></table></div>`
              : empty('该分组暂无监控项', 'Uptime Kuma 未返回此分组下的监控。'),
          )
        })
        .join('')
    } catch (error) {
      if (route !== 'status' || !document.getElementById('uptime-status')) return
      box.innerHTML = errorBox(
        '状态加载失败',
        '当前无法获取服务状态，请稍后重试。',
        `<button class="v6-btn" data-action="retry-uptime">${icon('refresh-cw')}重试</button>`,
        error.message,
      )
    }
  }

  function renderProviders() {
    app.innerHTML = `<div class="v6-shell"><div class="v6-title"><div><h1>提供商</h1><p>查看当前目录中各提供商承载的模型。</p></div><span class="v6-badge">${catalogLive ? '实时数据' : '演示数据'}</span></div><div class="v6-toolbar">${search('provider-search', '搜索提供商…')}<span id="provider-count" class="v6-toolbar-count v6-muted v6-small"></span></div><div id="provider-results"></div></div>`
    filterProviders()
  }
  function filterProviders() {
    const query = document.getElementById('provider-search').value.toLowerCase()
    // T6.7：卡片网格按承载模型数降序
    const list = currentHosts()
      .filter((name) => name.toLowerCase().includes(query))
      .map((name) => [name, models.filter((model) => model.hosts.includes(name)).length])
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name)
    document.getElementById('provider-count').textContent = list.length
      ? `${list.length} 个提供商`
      : ''
    document.getElementById('provider-results').innerHTML = list.length
      ? `<div class="v6-grid-3 v6-provider-grid">${list
          .map((name) => {
            const available = models.filter((model) => model.hosts.includes(name))
            const mods = [...new Set(available.flatMap((model) => model.outputs))]
            const rates = available
              .map((model) => model.inputRate)
              .filter((value) => value != null)
              .sort((a, b) => a - b)
            const unit = available.find((model) => model.imagePrice || model.audioPrice)
            // 价格区间：文本模型按输入 $/百万取 min–max；纯图像/音频提供商退回单价描述
            const price = rates.length
              ? rates[0] === rates[rates.length - 1]
                ? `${money(rates[0])} / 百万 tokens`
                : `${money(rates[0])} – ${money(rates[rates.length - 1])} / 百万 tokens`
              : unit
                ? modelPrice(unit)
                : '—'
            return `<a class="v6-item v6-provider" href="#/models?provider=${encodeURIComponent(name)}"><div class="v6-provider-head">${logo(name, 'lg')}<div class="v6-provider-id"><h3>${esc(name)}</h3><span class="v6-muted">${available.length} 个模型</span></div></div><div class="v6-provider-meta"><span class="v6-provider-mods">${mods
              .map((mod) => `<span title="${modalityNames[mod] || mod}">${icon(modalityIcons[mod] || 'layers')}</span>`)
              .join('')}</span><span class="v6-provider-price">${esc(price)}</span></div></a>`
          })
          .join('')}</div>`
      : query
        ? empty(
            '没有找到提供商',
            '尝试其他名称。',
            `<button class="v6-btn" data-action="search-clear" data-for="provider-search">${icon('x')}清除筛选</button>`,
          )
        : empty('还没有提供商', '目录加载后提供商列表会显示在这里。')
  }

  // T6.4：价格页筛选状态（搜索 + 输出模态，复用目录的交互模式）
  let pricingFilter = { q: '', modality: 'all' }
  function pricingResults() {
    const q = pricingFilter.q.trim().toLowerCase()
    // inputRate 为 0 的免费变体也是有效定价，不能按 falsy 滤掉
    const priced = models.filter(
      (model) =>
        model.inputRate != null || model.imagePrice != null || model.audioPrice != null,
    )
    const list = priced
      .filter((model) => pricingFilter.modality === 'all' || model.outputs.includes(pricingFilter.modality))
      .filter(
        (model) =>
          !q ||
          `${model.name} ${model.slug || ''} ${model.provider}`.toLowerCase().includes(q),
      )
      .sort((a, b) => (a.provider + a.name).localeCompare(b.provider + b.name))
    const rows = list
      .map((model) => {
        const free =
          !model.imagePrice && !model.audioPrice && !model.inputRate && !model.outputRate
        const tag = free
          ? '<span class="v6-badge success">免费</span>'
          : model.imagePrice
            ? '<span class="v6-badge neutral">按张</span>'
            : model.audioPrice
              ? '<span class="v6-badge neutral">按分钟</span>'
              : ''
        return `<tr><td data-th="模型">${link('models/' + encodeURIComponent(model.id), `<span class="v6-row">${logo(model.provider)}<span>${esc(model.name)}<span class="v6-muted">${esc(model.provider)}</span>${tag}</span>`, '')}</td><td data-th="输出类型">${esc(model.outputs.map((o) => modalityNames[o]).join(' / '))}</td>${catalogHasContext() ? `<td data-th="上下文" class="num">${esc(contextLabel(model))}</td>` : ''}${
          model.imagePrice || model.audioPrice
            ? `<td class="num" data-th="费率" colspan="2">${esc(modelPrice(model))}</td>`
            : free
              ? `<td class="num" data-th="输入 $/百万">$0.00</td><td class="num" data-th="输出 $/百万">$0.00</td>`
              : `<td class="num" data-th="输入 $/百万">${money(model.inputRate)}</td><td class="num" data-th="输出 $/百万">${money(model.outputRate)}</td>`
        }<td data-th="操作">${link('models/' + encodeURIComponent(model.id) + '?section=api', '调用示例', 'v6-link')}</td></tr>`
      })
      .join('')
    return `<div class="v6-result-count" aria-live="polite">${list.length} 个模型 · ${catalogLive ? '实时价格' : '演示价格'}</div>${
      list.length
        ? `<div class="v6-table-wrap"><table class="v6-table"><thead><tr><th>模型</th><th>输出类型</th>${catalogHasContext() ? '<th class="num">上下文</th>' : ''}<th class="num">输入<span class="v6-th-unit">$ / 百万 tokens</span></th><th class="num">输出<span class="v6-th-unit">$ / 百万 tokens</span></th><th>操作</th></tr></thead><tbody>${rows}</tbody></table></div>`
        : empty(
            priced.length ? '没有匹配的模型' : '还没有价格数据',
            priced.length ? '换个关键词或输出模态试试。' : '暂未获取到定价信息。',
            priced.length ? button('pricing-clear', '清除筛选', 'x') : '',
          )
    }`
  }
  function refreshPricing() {
    const host = document.getElementById('pricing-results')
    if (host) host.innerHTML = pricingResults()
  }
  function renderPricing() {
    app.innerHTML = `<div class="v6-shell v6-pricing">${head('价格', '按实际使用量付费；价格以实际计费为准。', `<span class="v6-badge">${catalogLive ? '实时价格' : '演示价格'}</span>`, '按量付费')}<div class="v6-toolbar">${search('pricing-search', '搜索模型或提供商', pricingFilter.q)}</div>${tabs(
      ['all', 'text', 'image', 'video', 'speech', 'transcription', 'embeddings'].map((value) => {
        const count =
          value === 'all'
            ? -1
            : models.filter((model) => model.outputs.includes(value)).length
        return [
          value,
          modalityNames[value] +
            (count < 0 ? '' : ` <span class="v6-count${count ? '' : ' empty'}">${count}</span>`),
          modalityIcons[value],
        ]
      }),
      pricingFilter.modality,
      'pricing-modality',
      '输出模态',
    )}<div id="pricing-results">${pricingResults()}</div>${section(
      'pricing-faq',
      '常见问题',
      '',
      [
        ['模型如何计费？', '文本模型通常按输入与输出 Token 分别计费；图像或音频模型使用张数、时长等计费单位。每个模型的详情页会显示对应费率。'],
        ['余额不足会发生什么？', '服务会按账户余额和 Key 限额决定请求是否可执行。建议在工作台关注用量并设置预算。'],
        ['价格与结算币种', '页面价格按美元显示，实际结算以服务端计费与汇率设置为准。'],
      ]
        .map(
          ([question, answer]) =>
            `<details class="v6-faq"><summary>${question}${icon('chevron-right')}</summary><p>${answer}</p></details>`,
        )
        .join(''),
    )}</div>`
  }
  function renderDocs() {
    const items = [
      ['quickstart', '快速开始', 'book-open'],
      ['authentication', '身份验证', 'key-round'],
      ['request', '首个请求', 'code'],
      ['model-selection', '模型选择', 'layers'],
      ['routing', '路由与回退', 'route'],
      ['errors', '错误处理', 'circle-help'],
      ['business', '企业接入', 'building-2'],
    ]
    app.innerHTML = `<div class="v6-shell v6-docs-layout"><nav class="v6-section-nav v6-docs-dir" aria-label="文档目录"><div class="v6-docs-dir-label">指南</div><a href="#/docs" class="active">${icon('book-open')}快速开始</a><div class="v6-docs-dir-label">资源</div><a href="#/models">${icon('layers')}模型目录</a><a href="#/providers">${icon('server')}提供商</a><a href="#/console/keys">${icon('key-round')}API Keys</a></nav><article><div class="v6-eyebrow">文档</div><h1 id="quickstart">快速开始</h1><p>使用统一的 OpenAI 兼容接口访问多个模型。在现有 SDK 中配置 Base URL、API Key 与模型标识即可开始。</p>${section('authentication', '创建 API Key', '为每个应用使用单独的密钥，设置用量上限，并避免在客户端暴露密钥。', `<div class="v6-callout">${icon('info')}<div>完整密钥只在创建时展示一次。请立即复制并妥善保管，遗失后只能重新生成。</div></div>${link('console/keys', '管理 API Keys', 'v6-btn', 'key-round')}`)}${section('request', '发出首个请求', `下方是请求结构示例，Base URL 为 ${apiBaseURL()}。`, codeBlock(models.find((model) => model.outputs[0] === 'text') || models[0] || docsSampleModel))}${section('model-selection', '选择模型', '模型标识采用 provider/model-name 格式。不同模型支持的模态、上下文与参数不同。', `<p>从目录中选择模型后，可在详情页复制 ID。发送请求前，确认输入类型与模型支持的模态一致。</p>${link('models', '浏览模型目录', 'v6-link', 'arrow-right')}`)}${section('routing', '路由与故障回退', '同一模型可由多个提供商承载。网关按可用性、配置和账户策略选择服务。', `<p>连接错误和可重试的上游错误可触发故障回退。建议在应用侧设置有限的重试次数，并使用指数退避处理临时限流。</p><div class="v6-callout warning">${icon('alert-triangle')}<div>应用侧重试请限制次数并加指数退避；对 5xx 与限流的无上限重试会放大故障与计费。</div></div>${link('providers', '查看提供商', 'v6-link', 'arrow-right')}`)}${section(
      'errors',
      '处理错误',
      '',
      `<div class="v6-table-wrap"><table class="v6-table"><thead><tr><th class="v6-code-cell">状态码</th><th>含义</th><th>处理方式</th></tr></thead><tbody>${[
        ['400', '请求参数错误', '检查模型、模态和参数'],
        ['401', '身份验证失败', '检查 API Key'],
        ['402', '余额不足', '检查余额与额度'],
        ['429', '请求限流', '退避后重试'],
        ['503', '上游暂时不可用', '稍后重试或选择其他模型'],
      ]
        .map(
          ([code, meaning, handling]) =>
            `<tr><td class="v6-code-cell"><span class="v6-badge mono ${code.startsWith('5') ? 'danger' : 'warning'}">${code}</span></td><td>${meaning}</td><td>${handling}</td></tr>`,
        )
        .join('')}</tbody></table></div>`,
    )}${section('business', '企业接入', '从 API Key、数据策略与预算开始配置工作区。', `<p>在接入前确认模型覆盖、数据保留要求和流量规模。控制台提供工作区名称、零数据保留与自动回退策略的本地配置。</p>${link('console/settings', '配置工作区', 'v6-btn', 'settings')}`)}</article><aside class="v6-docs-toc"><div class="v6-eyebrow">本页内容</div>${sectionNav(items)}</aside></div>`
  }

  function accountNav() {
    const item = (path, label, symbol, beta = false) =>
      `<a class="v6-side-link${path === route ? ' active' : ''}" href="#/${path}">${icon(symbol)}<span>${label}</span>${beta ? '<em class="v6-beta">Beta</em>' : ''}</a>`
    const workspaceLinks = [
      ['console', '概览', 'layout-grid'],
      ['console/keys', 'API Keys', 'key-round'],
      ...(feature('files') ? [['console/files', 'Files', 'file', true]] : []),
      ...(feature('guardrails') ? [['console/guardrails', '护栏', 'shield']] : []),
      ...(feature('byok') ? [['console/byok', 'BYOK', 'lock']] : []),
      ...(feature('routing') ? [['console/routing', '路由', 'route']] : []),
      ...(feature('presets') ? [['console/presets', '预设', 'layers']] : []),
      ...(feature('tools') ? [['console/tools', '工具', 'wrench']] : []),
      ...(feature('observability') ? [['console/observability', '可观测性', 'activity']] : []),
      ['console/settings', '设置', 'settings'],
    ]
    return `<aside class="v6-sidebar" aria-label="工作台导航"><div class="v6-side-workspace"><div class="v6-workspace-switch static"><span class="v6-ws-avatar">${esc(state.settings.name.slice(0, 1))}</span><span>${esc(state.settings.name)}</span></div></div><div class="v6-side-group"><div class="v6-side-label">工作区</div>${workspaceLinks
      .map(([p, l, s, b]) => item(p, l, s, b))
      .join('')}</div><div class="v6-side-group"><div class="v6-side-label">账户</div>${[
      ['console/profile', '个人资料', 'user'],
      ['console/activity', '活动', 'activity'],
      ['console/logs', '日志', 'list'],
      ['console/credits', '余额', 'wallet'],
      ['console/notifications', '通知', 'bell'],
      ['console/privacy', '隐私', 'eye-off'],
      ['console/preferences', '偏好', 'sliders-horizontal'],
    ]
      .map(([p, l, s, b]) => item(p, l, s, b))
      .join('')}</div></aside>`
  }
  function renderAccount() {
    const page =
      route === 'console/keys'
        ? pageKeys()
        : route === 'console/credits'
          ? pageCredits()
          : route === 'console/settings'
            ? pageSettings()
            : route === 'console/activity'
              ? pageActivity()
              : route === 'console/files'
                ? pageFiles()
                : route === 'console/guardrails'
                  ? pageGuardrails()
                  : route === 'console/byok'
                    ? pageByok()
                    : route === 'console/routing'
                      ? pageRouting()
                      : route === 'console/presets'
                        ? pagePresets()
                        : route === 'console/tools'
                          ? pageTools()
                          : route === 'console/observability'
                            ? pageObservability()
                            : route === 'console/profile'
                              ? pageProfile()
                              : route === 'console/logs'
                                ? pageLogs()
                                : route === 'console/notifications'
                                  ? pageNotifications()
                                  : route === 'console/privacy'
                                    ? pagePrivacy()
                                    : route === 'console/preferences'
                                      ? pagePreferences()
                                      : pageOverview()
    // T5.4：设置类页面收窄面板（label→switch 不超过 480px）
    const narrowConsole = [
      'console/settings',
      'console/profile',
      'console/notifications',
      'console/privacy',
      'console/preferences',
    ].includes(route)
    app.innerHTML = `<div class="v6-console${narrowConsole ? ' v6-console-narrow' : ''}">${accountNav()}<main class="v6-console-main">${page}</main></div>`
    if (route === 'console/keys') renderKeys()
    if (route === 'console/activity') loadActivity(1)
    clearInterval(logsTimer)
    logsTimer = null
    if (route === 'console/logs') {
      loadLogs()
      logsTimer = setInterval(loadLogs, 30000)
    }
    if (route === 'console') {
      loadOverviewUsage()
      loadOverviewRecent()
    }
    if (route === 'console/credits') loadCreditsExtras()
  }

  // T2.8：统一标题区结构——眉标(可选 12/500 muted) + H1 + 描述 + 操作区
  const head = (title, desc, action = '', eyebrow = '') =>
    `<div class="v6-title"><div>${eyebrow ? `<div class="v6-eyebrow">${eyebrow}</div>` : ''}<h1>${title}</h1>${desc ? `<p>${desc}</p>` : ''}</div>${action}</div>`
  const card = (title, desc, body, foot = '', cls = '') =>
    `<section class="v6-panel${cls ? ' ' + cls : ''}"><div class="v6-panel-head"><h3>${title}</h3>${desc ? `<p>${desc}</p>` : ''}</div><div class="v6-panel-body">${body}</div>${foot ? `<div class="v6-panel-foot">${foot}</div>` : ''}</section>`
  const field = (label, hint, input) =>
    `<div class="v6-field"><div class="v6-field-text"><span class="v6-field-label">${label}</span>${hint ? `<small>${hint}</small>` : ''}</div>${input}</div>`
  const toggle = (name, on, disabled = false) =>
    `<label class="v6-switch"><input type="checkbox" name="${name}" data-setting="${name}" ${on ? 'checked' : ''} ${disabled ? 'disabled' : ''}><span></span></label>`
  const wsCard = (path, title, desc, symbol) =>
    `<a class="v6-ws-card" href="#/${path}">${icon(symbol)}<div><h3>${title}</h3><p>${desc}</p></div>${icon('arrow-right')}</a>`
  // NT-01：仅保存在本机的统一提示条
  const localNote = () =>
    `<div class="v6-callout">${icon('info')}<div>这些偏好仅保存在当前浏览器，不会同步到其他设备或浏览器。</div></div>`

  function pageOverview() {
    if (!platform.authed || !platform.user)
      return `${head('概览', '登录后查看账户用量。')}${empty('需要登录', '登录账户后查看余额、用量与请求记录。', button('open-login', '登录', 'log-in'))}`
    const unit = SkinAPI.quotaPerUnit()
    const user = platform.user
    const quota = Number(user.quota || 0) / unit
    const used = Number(user.used_quota || 0) / unit
    const requests = Number(user.request_count || 0)
    // T6.9：新手清单——无密钥/无请求/余额不足时逐项引导，满足后自动消失
    const checklist = []
    if (!(platform.tokens || []).length)
      checklist.push(['创建第一个 API Key', '密钥用于在你的应用中调用模型。', 'console/keys', 'key-round', '去创建'])
    if (!requests)
      checklist.push(['发起第一次调用', '用密钥按调用示例发出首个请求。', 'docs', 'code', '查看示例'])
    if (quota <= 0)
      checklist.push(['充值余额', '使用兑换码充值后余额立即到账。', 'console/credits', 'wallet', '去充值'])
    const checklistHtml = checklist.length
      ? card(
          '新手清单',
          '完成以下步骤即可开始调用。',
          `<ul class="v6-checklist">${checklist
            .map(
              ([title, detail, path, symbol, cta]) =>
                `<li><span class="v6-check-dot">${icon(symbol)}</span><div class="v6-check-text"><strong>${title}</strong><small class="v6-muted">${detail}</small></div>${link(path, cta, 'v6-btn', 'arrow-right', true)}</li>`,
            )
            .join('')}</ul>`,
        )
      : ''
    return `${head('概览', esc(state.settings.name) + ' 工作区的用量与配置。')}${checklistHtml}<div class="v6-metric-row">${[
      ['可用余额', money(quota)],
      ['累计消费', money(used)],
      ['累计请求', requests.toLocaleString()],
    ]
      .map(
        ([label, value]) =>
          `<div class="v6-metric"><span class="v6-muted v6-small">${label}</span><strong>${kpi(value)}</strong></div>`,
      )
      .join('')}</div><div class="v6-row v6-between v6-block-head"><h2>近 7 天用量</h2>${link('console/activity', '查看活动', 'v6-link', 'arrow-right', true)}</div><div class="v6-chart-sm" id="overview-usage">${chart('account-usage')}</div><div class="v6-row v6-between v6-block-head"><h2>最近请求</h2>${link('console/activity', '查看全部', 'v6-link', 'arrow-right', true)}</div><div id="overview-recent">${skeletonRows(3)}</div><div class="v6-ws-grid">${[
      ['console/keys', 'API Keys', '创建和管理此工作区的 API Key。', 'key-round'],
      ...(feature('guardrails') ? [['console/guardrails', '护栏', '设置预算、模型与提供商限制、隐私和内容策略。', 'shield']] : []),
      ...(feature('byok') ? [['console/byok', 'BYOK', '在平台上使用你自己的提供商 API Key。', 'lock']] : []),
      ...(feature('routing') ? [['console/routing', '路由', '为模型和提供商设置路由策略。', 'route']] : []),
      ...(feature('presets') ? [['console/presets', '预设', '保存系统提示词和请求参数的快捷方式。', 'layers']] : []),
      ...(feature('tools') ? [['console/tools', '工具', '配置插件并控制请求可使用的服务器工具。', 'wrench']] : []),
      ...(feature('observability') ? [['console/observability', '可观测性', '连接 Langfuse、Datadog 等监控工具跟踪用量。', 'activity']] : []),
      ['console/settings', '设置', '编辑工作区名称和描述。', 'settings'],
    ]
      .map(([p2, t, d, s]) => wsCard(p2, t, d, s))
      .join('')}</div>`
  }
  function pageKeys() {
    if (!platform.authed) {
      return `${head('API Keys', '登录后创建密钥。完整密钥只在创建时展示一次。', button('open-login', '登录', 'log-in', '', 'v6-btn primary'))}${empty('需要登录', '注册或登录后，密钥会通过 /api/token 创建，并绑定到全模型分组。', button('open-login', '登录', 'log-in'))}`
    }
    return `${head('API Keys', '用于在你的应用中调用模型。完整密钥只在创建时显示一次。', button('create-key', '新建密钥', 'plus', '', 'v6-btn primary'))}${search('key-search', '搜索密钥…')}<div id="key-results" class="v6-mt-5"></div>`
  }
  function pageCredits() {
    if (!platform.authed || !platform.user)
      return `${head('余额', '登录后查看余额。')}${empty('需要登录', '登录账户后查看余额与充值记录。', button('open-login', '登录', 'log-in'))}`
    const unit = SkinAPI.quotaPerUnit()
    const quota = Number(platform.user.quota || 0) / unit
    const used = Number(platform.user.used_quota || 0) / unit
    const total = used + quota
    const pct = total > 0 ? Math.min(100, (used / total) * 100) : 0
    const tone = pct >= 90 ? ' danger' : pct >= 70 ? ' warn' : ''
    return `${head('余额', '个人账户余额与充值。', button('refresh-credits', '刷新', 'refresh-cw'))}${card(
      '可用余额',
      '',
      `<div class="v6-balance">${kpi(money(quota))}</div><div class="v6-row v6-between v6-small"><span class="v6-muted">已用 ${money(used)} / 总额 ${money(total)}</span><span class="v6-muted">本月消费 <strong class="v6-num" id="credits-month">—</strong></span></div><div class="v6-progress${tone}"><i data-w="${pct}%"></i></div>`,
      link('console/activity', '查看用量', 'v6-btn'),
    )}${card(
      '兑换码',
      '兑换成功后余额立即到账。',
      `<form id="topup-inline-form" class="v6-inline-form" novalidate><input class="v6-input" name="key" required autocomplete="off" placeholder="输入兑换码" aria-label="兑换码"><button class="v6-btn primary" type="submit" data-action="redeem-code">兑换</button></form>`,
    )}<div id="topup-history"></div>${card('说明', '', `<p class="v6-muted v6-small">余额与消费数据与账户实时同步。使用兑换码充值后余额立即到账。</p>`)}`
  }
  function pageSettings() {
    return `${head('设置', '管理工作区标识、支出控制和集成。')}${card('常规', '管理工作区名称。仅保存在本机。', field('名称', '在工作区成员间显示。', `<input class="v6-input" name="workspace" value="${esc(state.settings.name)}" maxlength="60" form="settings-form" data-dirty-watch>`), `<span class="v6-save-state v6-muted v6-small" id="settings-save-state" hidden>有未保存的更改</span><button class="v6-btn primary" type="submit" form="settings-form">保存</button>`)}<form id="settings-form" novalidate></form>${card('预算与数据', '管理支出上限和数据共享。更改即时生效，仅保存在本机。', `${field('工作区预算', '设置每日、每周或每月支出上限。', `<span class="v6-muted v6-small">未设置上限 · 需在服务端配置</span>`)}${field('自动故障回退', '当前提供商不可用时切换到其他路由。', toggle('fallback', state.settings.fallback))}`)}${card('隐私', '更改即时生效，仅保存在本机。', field('零数据保留', '优先使用不保留请求数据的提供商。', toggle('zdr', state.settings.zdr)))}${card('危险操作', '', `<div class="v6-row v6-between"><div><strong>删除工作区</strong><p class="v6-muted v6-small">删除后无法恢复。当前为唯一工作区，暂不能删除。</p></div><button class="v6-btn danger" disabled>删除工作区</button></div>`, '', 'danger')}`
  }
  function pageActivity() {
    if (!platform.authed)
      return `${head('活动', '你在平台上各模型的用量。')}${empty('需要登录', '登录后查看调用记录与用量。', button('open-login', '登录', 'log-in'))}`
    return `${head('活动', '你在平台上各模型的用量。')}<div class="v6-metric-row" id="activity-metrics">${[
      ['近 7 天消费', '60px'],
      ['请求/分钟', '40px'],
      ['Tokens/分钟', '48px'],
      ['累计消费', ''],
    ]
      .map(
        ([l, w], i) =>
          `<div class="v6-metric"><span class="v6-muted v6-small">${l}</span><strong>${
            w
              ? '<span class="v6-skeleton v6-skel-metric" data-w="' + w + '"></span>'
              : kpi(money(Number(platform.user?.used_quota || 0) / SkinAPI.quotaPerUnit()))
          }</strong></div>`,
      )
      .join('')}</div><div class="v6-row v6-between v6-block-head"><h2>Token 用量</h2><select class="v6-select" data-chart-period="account-usage"><option value="7">最近 7 天</option><option value="30">最近 30 天</option></select></div>${chart('account-usage')}<div class="v6-row v6-between v6-block-head"><h2>请求记录</h2>${button('export-activity', '导出 CSV', 'download')}</div><div class="v6-toolbar">${search('activity-search', '搜索模型…')}<select class="v6-select" id="activity-status"><option value="all">全部类型</option><option value="2">消费</option><option value="1">充值</option><option value="3">管理</option></select><select class="v6-select" id="activity-period"><option value="7">最近 7 天</option><option value="1">最近 24 小时</option><option value="30">最近 30 天</option></select></div><div id="activity-results" class="v6-mt-4">${skeletonRows(6)}</div><div class="v6-pager"><span id="activity-page-info" class="v6-muted v6-small"></span><button class="v6-btn" data-action="activity-prev" id="activity-prev" disabled>${icon('chevron-left')}上一页</button><button class="v6-btn" data-action="activity-next" id="activity-next" disabled>下一页${icon('chevron-right')}</button></div>`
  }
  function pageFiles() {
    return `${head('Files', '上传文件以在支持的模型中使用。', button('upload-file', '上传文件', 'upload', '', 'v6-btn primary'))}${card('文件', '', `<div class="v6-table-wrap"><table class="v6-table"><thead><tr><th>名称</th><th>大小</th><th>用途</th><th>上传时间</th></tr></thead><tbody><tr><td colspan="4">${empty('还没有文件', '上传文件后可在支持的模型请求中引用。')}</td></tr></tbody></table></div>`)}`
  }
  function pageGuardrails() {
    return `${head('护栏', '设置预算、模型与提供商限制、隐私和内容策略。')}${card('支出上限', '', `<p class="v6-muted">未配置支出上限。</p>`, button('add-guardrail', '添加护栏', 'plus'))}${card('模型限制', '限制此工作区可调用的模型。', `<p class="v6-muted">允许所有模型。</p>`)}${card('提供商限制', '', `<p class="v6-muted">允许所有提供商。</p>`)}`
  }
  function pageByok() {
    return `${head('BYOK', '使用你自己的提供商 API Key。')}${card('提供商 API Key', '添加提供商 API Key 后，对应请求将走你的账户计费。', `<p class="v6-muted">尚未配置任何提供商 API Key。</p>`, button('add-byok', '添加提供商 API Key', 'plus'))}`
  }
  function pageRouting() {
    return `${head('路由', '为模型和提供商设置路由策略。')}${card('提供商排序', '拖动调整提供商优先级，请求将按顺序尝试。', `<div class="v6-table-wrap"><table class="v6-table"><thead><tr><th>提供商</th><th class="num">优先级</th><th>状态</th></tr></thead><tbody>${['OpenAI', 'Anthropic', 'Google', 'DeepSeek'].map((p, i) => `<tr><td>${p}</td><td class="num">${i + 1}</td><td><span class="v6-badge green">启用</span></td></tr>`).join('')}</tbody></table></div>`)}${field('允许回退', '主要提供商不可用时尝试其他提供商。', toggle('fallback', state.settings.fallback))}`
  }
  function pagePresets() {
    return `${head('预设', '保存系统提示词和请求参数的快捷方式。', button('create-preset', '新建预设', 'plus', '', 'v6-btn primary'))}${card('预设', '', `<p class="v6-muted">还没有预设。预设可快速应用一组系统提示词和参数。</p>`)}`
  }
  function pageTools() {
    return `${head('工具', '配置插件并控制请求可使用的服务器工具。')}${card('插件', '', `<p class="v6-muted">未启用任何插件。</p>`, button('add-tool', '添加插件', 'plus'))}`
  }
  function pageObservability() {
    return `${head('可观测性', '连接监控工具跟踪用量。')}${card('集成', '', `<p class="v6-muted">连接 Langfuse、Datadog 等以跟踪请求和用量。</p>`, button('add-observability', '添加集成', 'plus'))}`
  }
  function pageProfile() {
    if (!platform.authed)
      return `${head('个人资料', '登录后显示账户信息。', button('open-login', '登录', 'log-in', '', 'v6-btn primary'))}`
    const user = platform.user || {}
    const displayName = user.display_name || user.username || '—'
    const group = user.group || platform.group || '默认分组'
    // T6.13：身份块——48px 头像 + 显示名 + 分组徽标
    const identity = `<div class="v6-identity"><span class="v6-ws-avatar">${esc(displayName.slice(0, 1).toUpperCase())}</span><div class="v6-identity-text"><strong>${esc(displayName)}</strong><div class="v6-row"><span class="v6-badge">${esc(group)}</span><span class="v6-muted v6-small mono">#${esc(String(user.id ?? '—'))}</span></div></div></div>`
    return `${head('个人资料', '账户信息。')}${card('账户', '', `${identity}<dl class="v6-desc"><dt>用户名</dt><dd>${esc(user.username || '—')}</dd><dt>显示名称</dt><dd>${esc(displayName)}</dd><dt>用户 ID</dt><dd><span class="mono">${esc(String(user.id ?? '—'))}</span>${iconButton('copy', '复制用户 ID', 'copy', `data-copy="${esc(String(user.id ?? ''))}"`)}</dd><dt>分组</dt><dd>${esc(group)}</dd></dl>`)}`
  }
  function pageLogs() {
    if (!platform.authed)
      return `${head('日志', '最近的 API 请求日志。')}${empty('需要登录', '登录后查看 API 请求日志。', button('open-login', '登录', 'log-in'))}`
    const tokenOptions = (platform.tokens || [])
      .map((key) => `<option value="${esc(key.name)}">${esc(key.name)}</option>`)
      .join('')
    return `${head('日志', '最近的 API 请求日志，每 30 秒自动刷新。', button('logs-refresh', '刷新', 'refresh-cw'))}<div class="v6-toolbar">${search('log-search', '搜索模型…')}<select class="v6-select" id="log-type" aria-label="日志类型"><option value="all">全部类型</option><option value="2">消费</option><option value="1">充值</option><option value="3">管理</option><option value="4">系统</option></select><select class="v6-select" id="log-token" aria-label="密钥筛选"><option value="all">全部密钥</option>${tokenOptions}</select><select class="v6-select" id="log-period" aria-label="时间范围"><option value="7">最近 7 天</option><option value="1">最近 24 小时</option><option value="30">最近 30 天</option></select></div><div id="log-results" class="v6-mt-4">${skeletonRows(5)}</div><div class="v6-pager"><span id="log-page-info" class="v6-muted v6-small"></span><button class="v6-btn" data-action="logs-prev" id="logs-prev" disabled>${icon('chevron-left')}上一页</button><button class="v6-btn" data-action="logs-next" id="logs-next" disabled>下一页${icon('chevron-right')}</button></div>`
  }
  function pageNotifications() {
    return `${head('通知', '管理账户通知。')}${card('通知偏好', '更改即时生效，仅保存在本机。', `${field('用量告警', '余额不足或超限时通知。', toggle('notif-usage', true))}${field('产品更新', '接收新模型和功能公告。', toggle('notif-product', true))}`)}${localNote()}`
  }
  function pagePrivacy() {
    return `${head('隐私', '控制数据和隐私设置。')}${card('数据策略', '更改即时生效，仅保存在本机。', `${field('零数据保留', '优先使用不保留请求数据的提供商。', toggle('zdr', state.settings.zdr))}${field('允许提示词训练', '允许提供商使用你的提示词改进模型。', toggle('train', false))}`)}${localNote()}`
  }
  function pagePreferences() {
    const themeValue = state.settings.theme || 'system'
    const themeCard = card(
      '外观',
      '选择界面主题，立即生效。',
      `<div class="v6-segment" role="radiogroup" aria-label="界面主题">${[
        ['system', '跟随系统', 'monitor'],
        ['light', '浅色', 'sun'],
        ['dark', '深色', 'moon'],
      ]
        .map(
          ([value, label, symbol]) =>
            `<button type="button" class="${themeValue === value ? 'active' : ''}" data-action="theme-set" data-value="${value}" role="radio" aria-checked="${themeValue === value}" aria-pressed="${themeValue === value}">${icon(symbol)}${label}</button>`,
        )
        .join('')}</div>`,
    )
    return `${head('偏好', '界面外观偏好。主题、收藏、工作区名称与数据偏好仅保存在当前浏览器。')}${themeCard}${localNote()}`
  }
  function quotaHtml(token) {
    // KY-04：已用 / 总额 双行 + 进度条；额度占比高时变色提示
    const unit = SkinAPI.quotaPerUnit()
    if (token.unlimited_quota) return '<span class="v6-muted">不限额度</span>'
    const used = Number(token.used_quota || 0) / unit
    const remain = Number(token.remain_quota || 0) / unit
    const total = used + remain
    const pct = total > 0 ? Math.min(100, (used / total) * 100) : 0
    const tone = pct >= 90 ? ' danger' : pct >= 70 ? ' warn' : ''
    return `<span class="v6-num">${money(used)} / ${money(total)}</span><div class="v6-progress${tone}"><i data-w="${pct}%"></i></div>`
  }
  function relTime(ts) {
    // KY-02：相对时间（3 天前 / 2 小时后），完整时间放 title
    if (!ts || ts < 0) return '—'
    const diff = ts * 1000 - Date.now()
    const abs = Math.abs(diff)
    const units = [
      [86400 * 365, '年'],
      [86400 * 30, '个月'],
      [86400, '天'],
      [3600, '小时'],
      [60, '分钟'],
    ]
    for (const [sec, label] of units) {
      if (abs >= sec * 1000) {
        const n = Math.floor(abs / (sec * 1000))
        return diff < 0 ? `${n} ${label}前` : `${n} ${label}后`
      }
    }
    return diff < 0 ? '刚刚' : '即将'
  }
  function expiryText(token) {
    if (!token.expired_time || token.expired_time < 0) return '永不过期'
    return `<time class="rel" title="${esc(formatTime(token.expired_time))}">${esc(relTime(token.expired_time))}</time>`
  }
  function accessText(token) {
    if (!token.accessed_time) return '从未'
    return `<time class="rel" title="${esc(formatTime(token.accessed_time))}">${esc(relTime(token.accessed_time))}</time>`
  }
  function maskedKey(token) {
    const value = token.key || ''
    if (!value) return 'sk-••••'
    return value.startsWith('sk-') ? value : 'sk-' + value
  }
  function renderKeys() {
    const box = document.getElementById('key-results')
    if (!box) return
    const query = document.getElementById('key-search')?.value.toLowerCase() || ''
    const list = (platform.tokens || []).filter((key) => key.name.toLowerCase().includes(query))
    box.innerHTML = list.length
      ? `<div class="v6-table-wrap"><table class="v6-table v6-mobile-cards"><thead><tr><th>密钥</th><th>分组</th><th>过期时间</th><th>最近使用</th><th class="num">用量</th><th>状态</th><th>操作</th></tr></thead><tbody>${list
          .map((key) => {
            const enabled = key.status === 1
            return `<tr><td data-label="密钥"><div class="v6-keycell"><strong title="${esc(key.name)}">${esc(key.name)}</strong><span class="v6-muted mono" title="${esc(maskedKey(key))}">${esc(maskedKey(key))}</span>${iconButton('copy', '复制密钥标识', 'copy', `data-copy="${esc(maskedKey(key))}"`)}</div></td><td data-label="分组">${esc(key.group || platform.group || '—')}<div class="v6-muted v6-small">${key.model_limits_enabled ? '已限制模型' : '不限制模型'}</div></td><td data-label="过期时间">${expiryText(key)}</td><td data-label="最近使用">${accessText(key)}</td><td data-label="用量" class="num">${quotaHtml(key)}</td><td data-label="状态"><label class="v6-switch" title="${enabled ? '已启用，点击停用' : '已停用，点击启用'}"><input type="checkbox" role="switch" data-key-toggle="${esc(key.id)}" ${enabled ? 'checked' : ''} aria-label="启用或停用密钥"><span></span></label></td><td data-label="操作" class="v6-nowrap">${iconButton('edit-key', '编辑密钥', 'pencil', `data-id="${esc(key.id)}"`)}${iconButton('delete-key', '删除密钥', 'trash-2', `data-id="${esc(key.id)}"`, 'v6-btn ghost v6-icon-btn danger')}</td></tr>`
          })
          .join(
            '',
          )}</tbody></table></div><div class="v6-table-note">${list.length} 个密钥 · 完整密钥只在创建时出现一次</div>`
      : query
        ? empty(
            '没有找到密钥',
            '没有名称匹配的密钥，试试其他关键词。',
            `<button class="v6-btn" data-action="search-clear" data-for="key-search">${icon('x')}清除筛选</button>`,
          )
        : empty(
            '还没有 API Key',
            '创建一个密钥后，明文只展示一次。',
            button('create-key', '创建密钥', 'plus'),
          )
  }
  function logTypeLabel(type) {
    return { 1: '充值', 2: '消费', 3: '管理', 4: '系统' }[type] || '消费'
  }
  function logTypeBadge(type) {
    // AC：类型列用语义化 badge 而不是纯文本
    const map = { 1: 'success', 2: '', 3: 'warning', 4: 'info' }
    const cls = map[type] ?? ''
    return `<span class="v6-badge${cls ? ' ' + cls : ''}">${logTypeLabel(type)}</span>`
  }
  function formatTime(ts) {
    if (!ts) return '—'
    return new Date(Number(ts) * 1000).toLocaleString('sv-SE')
  }
  function activityTable(list) {
    const unit = SkinAPI.quotaPerUnit()
    // T2.5：data-label 供 375px 卡片布局显示列名
    return `<div class="v6-table-wrap"><table class="v6-table v6-mobile-cards"><thead><tr><th>时间</th><th>模型</th><th>输入 / 输出</th><th>密钥</th><th>成本</th><th>类型</th></tr></thead><tbody>${list.map((item) => `<tr><td data-label="时间">${formatTime(item.created_at)}</td><td data-label="模型" title="${esc(item.model_name || '—')}">${esc(item.model_name || '—')}</td><td class="num" data-label="输入 / 输出">${Number(item.prompt_tokens || 0).toLocaleString()} / ${Number(item.completion_tokens || 0).toLocaleString()}</td><td data-label="密钥" title="${esc(item.token_name || '—')}">${esc(item.token_name || '—')}</td><td class="num" data-label="成本">${money(Number(item.quota || 0) / unit)}</td><td data-label="类型">${logTypeBadge(item.type)}</td></tr>`).join('')}</tbody></table></div>`
  }
  function activityFilters() {
    const status = document.getElementById('activity-status')?.value || 'all'
    const days = Number(document.getElementById('activity-period')?.value || '7')
    const model = document.getElementById('activity-search')?.value.trim() || ''
    const end = Math.floor(Date.now() / 1000)
    const start = end - days * 86400
    const query = { start, end }
    if (status !== 'all') query.type = Number(status)
    if (model) query.model = model
    return { query, days }
  }
  function refreshActivityMetrics() {
    const row = document.getElementById('activity-metrics')
    if (!row || !liveData.stats) return
    const unit = SkinAPI.quotaPerUnit()
    const cells = row.querySelectorAll('strong')
    // AC-01：指标统一千分位
    if (cells[0]) cells[0].innerHTML = kpi(money(Number(liveData.stats.quota || 0) / unit))
    if (cells[1]) cells[1].textContent = Number(liveData.stats.rpm ?? 0).toLocaleString()
    if (cells[2]) cells[2].textContent = Number(liveData.stats.tpm ?? 0).toLocaleString()
  }
  async function loadActivity(page) {
    const box = document.getElementById('activity-results')
    if (!box) return
    const { query, days } = activityFilters()
    box.innerHTML = skeletonRows(6)
    // AC-02：加载中禁用翻页，避免连点叠加请求
    const prevBtn = document.getElementById('activity-prev')
    const nextBtn = document.getElementById('activity-next')
    if (prevBtn) prevBtn.disabled = true
    if (nextBtn) nextBtn.disabled = true
    try {
      const [result, stats] = await Promise.all([
        SkinAPI.listLogs({ ...query, page, size: 20 }),
        SkinAPI.logStats(query).catch(() => null),
      ])
      liveData.logs = result
      if (stats) liveData.stats = stats
      refreshActivityMetrics()
      const items = result.items || []
      box.innerHTML = items.length
        ? activityTable(items)
        : empty('没有匹配的请求', '调整时间、类型或搜索条件。')
      const total = Number(result.total || 0)
      const pages = Math.max(1, Math.ceil(total / 20))
      const info = document.getElementById('activity-page-info')
      if (info) info.textContent = `共 ${total.toLocaleString()} 条 · 第 ${result.page}/${pages} 页`
      const prev = document.getElementById('activity-prev')
      const next = document.getElementById('activity-next')
      if (prev) prev.disabled = page <= 1
      if (next) next.disabled = items.length < 20 || page >= pages
      // R-04：表格重试成功后，若图表停在错误态一并恢复
      if (!liveData.usage || liveChartData['account-usage']?.state === 'error') loadUsageChart(days)
    } catch (error) {
      const prev = document.getElementById('activity-prev')
      const next = document.getElementById('activity-next')
      if (prev) prev.disabled = false
      if (next) next.disabled = false
      // R-04 / G-33：指标卡从骨架落到 "—" 并附提示；用量图进入错误态（自带重试）
      liveChartData['account-usage'] = { state: 'error' }
      liveData.usage = true
      document.getElementById('activity-metrics')?.querySelectorAll('strong').forEach((cell, i) => {
        if (i < 3) {
          cell.textContent = '—'
          cell.parentElement.title = '数据加载失败，请重试'
        }
      })
      drawCharts()
      box.innerHTML = errorBox(
        '请求记录加载失败',
        '请稍后重试，或调整筛选条件。',
        `<button class="v6-btn" data-action="activity-retry">${icon('refresh-cw')}重试</button>`,
        error.message,
      )
    }
  }
  function filterActivity() {
    loadActivity(1)
  }
  // T6.12：日志页筛选条（模型 / 密钥 / 类型 / 时间），与活动页同一套查询参数
  function logFilters() {
    const type = document.getElementById('log-type')?.value || 'all'
    const token = document.getElementById('log-token')?.value || 'all'
    const days = Number(document.getElementById('log-period')?.value || '7')
    const model = document.getElementById('log-search')?.value.trim() || ''
    const end = Math.floor(Date.now() / 1000)
    const start = end - days * 86400
    const query = { start, end }
    if (type !== 'all') query.type = Number(type)
    if (token !== 'all') query.token = token
    if (model) query.model = model
    return query
  }
  // LG-01：日志页与活动页一致的分页器；自动刷新停留在当前页
  async function loadLogs(page) {
    const box = document.getElementById('log-results')
    if (!box) return
    const target = page || liveData.logsList.page || 1
    const prevBtn = document.getElementById('logs-prev')
    const nextBtn = document.getElementById('logs-next')
    if (prevBtn) prevBtn.disabled = true
    if (nextBtn) nextBtn.disabled = true
    try {
      const result = await SkinAPI.listLogs({ ...logFilters(), page: target, size: 20 })
      liveData.logsList = result
      const items = result.items || []
      box.innerHTML = items.length
        ? activityTable(items)
        : empty('没有匹配的日志', '调整筛选条件，或调用模型后再来看。')
      const total = Number(result.total || 0)
      const pages = Math.max(1, Math.ceil(total / 20))
      const info = document.getElementById('log-page-info')
      if (info) info.textContent = `共 ${total.toLocaleString()} 条 · 第 ${result.page}/${pages} 页`
      const prev = document.getElementById('logs-prev')
      const next = document.getElementById('logs-next')
      if (prev) prev.disabled = result.page <= 1
      if (next) next.disabled = items.length < 20 || result.page >= pages
    } catch (error) {
      const prev = document.getElementById('logs-prev')
      const next = document.getElementById('logs-next')
      if (prev) prev.disabled = false
      if (next) next.disabled = false
      box.innerHTML = errorBox(
        '日志加载失败',
        '请稍后重试，或检查网络连接。',
        `<button class="v6-btn" data-action="logs-retry">${icon('refresh-cw')}重试</button>`,
        error.message,
      )
    }
  }
  function filterLogs() {
    loadLogs(1)
  }
  // G-33/34：图表数据三态——只存真实值（美元），不预归一化；
  // 加载中 / 空 / 失败都由 drawCharts 渲染对应占位，绝不用假数据顶替
  async function loadUsageChart(days) {
    if (!platform.authed) return
    liveChartData['account-usage'] = { state: 'loading' }
    drawCharts()
    try {
      const data = await SkinAPI.selfData(days || 7)
      const items = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : []
      const buckets = {}
      items.forEach((item) => {
        const day = Number(item.created_at || 0)
        buckets[day] = (buckets[day] || 0) + Number(item.quota || 0)
      })
      const keys = Object.keys(buckets).sort((x, y) => x - y)
      const values = keys.map((k) => buckets[k] / SkinAPI.quotaPerUnit())
      const points = Number(days) === 1 ? 24 : Number(days) || 7
      const padded = [...new Array(Math.max(0, points - values.length)).fill(0), ...values].slice(
        -points,
      )
      liveChartData['account-usage'] = {
        state: padded.some((v) => v > 0) ? 'ok' : 'empty',
        buckets: padded,
        series: [1],
        unit: '$',
      }
      liveData.usage = true
      drawCharts()
    } catch {
      liveChartData['account-usage'] = { state: 'error' }
      liveData.usage = true
      drawCharts()
    }
  }
  async function loadOverviewUsage() {
    if (!platform.authed) return
    liveChartData['account-usage'] = { state: 'loading' }
    drawCharts()
    try {
      const data = await SkinAPI.selfData(7)
      const items = Array.isArray(data) ? data : []
      const buckets = {}
      items.forEach((item) => {
        const day = Number(item.created_at || 0)
        buckets[day] = (buckets[day] || 0) + Number(item.quota || 0)
      })
      const keys = Object.keys(buckets).sort((x, y) => x - y)
      const values = keys.map((k) => buckets[k] / SkinAPI.quotaPerUnit())
      const padded = [...new Array(Math.max(0, 7 - values.length)).fill(0), ...values].slice(-7)
      liveChartData['account-usage'] = {
        state: padded.some((v) => v > 0) ? 'ok' : 'empty',
        buckets: padded,
        series: [1],
        unit: '$',
      }
      drawCharts()
    } catch {
      liveChartData['account-usage'] = { state: 'error' }
      drawCharts()
    }
  }
  // T6.9：概览页"最近 5 条请求"——静默加载，失败只留一行提示不打断页面
  async function loadOverviewRecent() {
    const box = document.getElementById('overview-recent')
    if (!box || !platform.authed) return
    try {
      const result = await SkinAPI.listLogs({ page: 1, size: 5 })
      const items = result.items || []
      box.innerHTML = items.length
        ? activityTable(items)
        : `<p class="v6-muted v6-small">还没有请求记录，发起第一次调用后会显示在这里。</p>`
    } catch {
      box.innerHTML = `<p class="v6-muted v6-small">最近请求加载失败，可在活动页重试。</p>`
    }
  }
  // T6.11：余额页补充数据——本月消费（logStat 当月聚合）+ 充值记录（有数据才渲染卡片）
  async function loadCreditsExtras() {
    const unit = SkinAPI.quotaPerUnit()
    const monthNode = document.getElementById('credits-month')
    const histBox = document.getElementById('topup-history')
    if (monthNode) {
      const now = new Date()
      const start = Math.floor(new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000)
      const end = Math.floor(Date.now() / 1000)
      SkinAPI.logStats({ type: 2, start, end })
        .then((stats) => {
          monthNode.textContent = money(Number(stats.quota || 0) / unit)
        })
        .catch(() => {
          monthNode.textContent = '—'
        })
    }
    if (histBox)
      SkinAPI.topupHistory()
        .then((list) => {
          const items = Array.isArray(list) ? list : []
          if (!items.length) {
            histBox.innerHTML = ''
            return
          }
          histBox.innerHTML = card(
            '充值记录',
            '',
            `<div class="v6-table-wrap"><table class="v6-table v6-mobile-cards"><thead><tr><th>时间</th><th class="num">金额</th><th>渠道</th></tr></thead><tbody>${items
              .slice(0, 10)
              .map(
                (item) =>
                  `<tr><td data-label="时间">${formatTime(item.create_time || item.created_at)}</td><td class="num" data-label="金额">${money(Number(item.amount ?? item.quota ?? 0) / unit)}</td><td data-label="渠道">${esc(item.pay_method || item.channel || '兑换码')}</td></tr>`,
              )
              .join('')}</tbody></table></div>`,
          )
        })
        .catch(() => {
          histBox.innerHTML = ''
        })
  }
  // G-34 / R-05：nice-number 刻度——step 取 1/2/2.5/5×10ⁿ 中最小且 step×4 ≥ max 的，
  // 返回图表最大值（即 step×4），4 个刻度均匀落在整步长上
  function niceCeil(max) {
    if (!(max > 0)) return 4
    for (let p = Math.floor(Math.log10(max)) - 1; p < 12; p++) {
      for (const s of [1, 2, 2.5, 5]) {
        const top = s * Math.pow(10, p) * 4
        if (top >= max) return top
      }
    }
    return max
  }
  function fmtTick(v, unit) {
    const n =
      v >= 1000 ? fmtTokens(v) : v >= 100 ? String(Math.round(v)) : String(+v.toPrecision(3))
    return unit === '$' ? '$' + n : unit === 'B' ? n + 'B' : n
  }
  function setChartState(canvas, state) {
    const wrap = canvas.closest('.v6-chart')
    if (!wrap) return
    canvas.style.visibility = 'hidden'
    let node = wrap.querySelector('.v6-chart-state')
    if (!node) {
      node = document.createElement('div')
      node.className = 'v6-chart-state'
      wrap.append(node)
    }
    node.innerHTML =
      state === 'loading'
        ? '<span class="v6-skeleton v6-skel-line" data-w="60%"></span><span class="v6-skeleton v6-skel-line" data-w="40%"></span>'
        : state === 'error'
          ? `${icon('info')}<span>用量数据加载失败</span><button type="button" class="v6-btn sm" data-action="chart-retry" data-chart-id="${esc(canvas.id)}">重试</button>`
          : `${icon('chart-no-axes-combined')}<span>还没有用量数据</span>`
  }
  function clearChartState(canvas) {
    canvas.style.visibility = ''
    canvas.closest('.v6-chart')?.querySelector('.v6-chart-state')?.remove()
  }

  // R-06：弹窗期间把同一个 #v6-toasts 节点挂进 dialog，关闭时移回 body——
  // top layer 里 popover 后入者居上，移入后重新 showPopover 让 toast 始终压过遮罩
  function moveToastsInto(node) {
    const box = document.getElementById('v6-toasts')
    if (!box || box.parentElement === node) return
    const wasOpen = box.matches?.(':popover-open')
    if (wasOpen) {
      try { box.hidePopover() } catch {}
    }
    node.append(box)
    if (wasOpen) {
      try { box.showPopover() } catch {}
    }
  }
  // T3.1：desc 可选——头 = 标题 16/600 + 描述，体 = body，尾 = 内容里的 .v6-dialog-foot（右对齐）
  function showDialog(title, body, desc = '') {
    if (!dialog.open) dialogOpener = document.activeElement
    dialog.className = 'v6-dialog'
    dialog.innerHTML = `<div class="v6-dialog-head"><div><h2 id="v6-dialog-title">${title}</h2>${desc ? `<p class="v6-dialog-desc">${desc}</p>` : ''}</div>${iconButton('close-dialog', '关闭', 'x')}</div><div class="v6-dialog-body">${body}</div>`
    dialog.setAttribute('aria-labelledby', 'v6-dialog-title')
    if (!dialog.open) dialog.showModal()
    moveToastsInto(dialog)
    dialog.querySelector('input, textarea, select')?.focus()
  }
  function closeDialog() {
    dialog.close()
    moveToastsInto(document.body)
    if (dialogOpener?.isConnected) dialogOpener.focus()
  }
  function expiryChoice(token) {
    if (!token || !token.expired_time || token.expired_time < 0) return '永不过期'
    const days = Math.round((token.expired_time * 1000 - Date.now()) / 86400000)
    if (days > 300) return '1 年'
    if (days > 60) return '90 天'
    return '30 天'
  }
  function expirySeconds(label) {
    const days = label === '30 天' ? 30 : label === '90 天' ? 90 : label === '1 年' ? 365 : 0
    return days ? Math.floor(Date.now() / 1000) + days * 86400 : -1
  }
  function keyDialog(id = '') {
    const key = (platform.tokens || []).find((item) => String(item.id) === String(id))
    showDialog(
      key ? '编辑 API Key' : '创建 API Key',
      `<form id="key-form" novalidate data-id="${esc(id)}"><label class="v6-form-label">名称<input class="v6-input" name="name" required maxlength="50" placeholder="例如 Production App" value="${esc(key?.name || '')}"></label><label class="v6-form-label">有效期<select class="v6-select" name="expiry">${['永不过期', '30 天', '90 天', '1 年'].map((value) => `<option ${expiryChoice(key) === value ? 'selected' : ''}>${value}</option>`).join('')}</select></label><p class="v6-small v6-muted">此密钥可调用全部模型，额度不限。</p><div class="v6-dialog-foot">${button('close-dialog', '取消')}<button type="submit" class="v6-btn primary">${key ? '保存' : '创建密钥'}</button></div></form>`,
    )
  }
  function revealKeyDialog(secret) {
    showDialog(
      '密钥已创建',
      `<p class="v6-muted">完整密钥只展示这一次。请立即复制。列表里之后只会显示掩码。</p><div class="v6-input-wrap"><input class="v6-input mono" id="created-key" readonly aria-label="新密钥" value="${esc(secret)}">${iconButton('copy', '复制密钥', 'copy', `data-copy="${esc(secret)}"`, 'v6-btn ghost v6-icon-btn v6-input-eye')}</div><div class="v6-dialog-foot">${button('close-dialog', '完成', 'check', '', 'v6-btn primary')}</div>`,
    )
  }
  // 按 Platform /api/status 的开关显示三方登录入口
  function oauthProviders() {
    const status = platform.status || {}
    const out = []
    if (status.github_oauth && status.github_client_id) out.push({ type: 'github', name: 'GitHub' })
    if (status.discord_oauth && status.discord_client_id) out.push({ type: 'discord', name: 'Discord' })
    if (status.oidc_enabled && status.oidc_client_id && status.oidc_authorization_endpoint)
      out.push({ type: 'oidc', name: 'OIDC' })
    if (status.linuxdo_oauth && status.linuxdo_client_id) out.push({ type: 'linuxdo', name: 'LinuxDO' })
    if (status.telegram_oauth || status.telegram_oauth_configured) out.push({ type: 'telegram', name: 'Telegram' })
    if (status.wechat_login) out.push({ type: 'wechat', name: '微信' })
    return out
  }
  const OAUTH_ICONS = {
    github: 'github',
    discord: 'users',
    oidc: 'shield',
    linuxdo: 'compass',
    telegram: 'send',
    wechat: 'message-circle',
  }
  function oauthButtons() {
    const items = oauthProviders()
    if (!items.length) return ''
    // AU-06：各提供商用区分度更高的图标，不再清一色 log-in
    return `<div class="v6-oauth-divider"><span>或使用以下方式继续</span></div><div class="v6-oauth-grid">${items
      .map(
        (item) =>
          button(
            'oauth-login',
            item.name,
            OAUTH_ICONS[item.type] || 'log-in',
            `data-provider="${item.type}"`,
            'v6-btn',
          ),
      )
      .join('')}</div>`
  }
  function oauthAuthorizeUrl(provider, flow) {
    const status = platform.status || {}
    const state = flow.flow_token
    switch (provider) {
      case 'github':
        return `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(status.github_client_id)}&state=${encodeURIComponent(state)}&scope=user:email`
      case 'discord': {
        const url = new URL('https://discord.com/oauth2/authorize')
        url.searchParams.set('client_id', status.discord_client_id)
        url.searchParams.set('redirect_uri', location.origin + '/oauth/discord')
        url.searchParams.set('response_type', 'code')
        url.searchParams.set('scope', 'identify+openid')
        url.searchParams.set('state', state)
        return url.toString()
      }
      case 'oidc': {
        const url = new URL(status.oidc_authorization_endpoint)
        url.searchParams.set('client_id', status.oidc_client_id)
        url.searchParams.set('redirect_uri', location.origin + '/oauth/oidc')
        url.searchParams.set('response_type', 'code')
        url.searchParams.set('scope', 'openid profile email')
        url.searchParams.set('state', state)
        return url.toString()
      }
      case 'linuxdo':
        return `https://connect.linux.do/oauth2/authorize?response_type=code&client_id=${encodeURIComponent(status.linuxdo_client_id)}&state=${encodeURIComponent(state)}`
      case 'telegram':
        return flow.authorization_url || ''
      case 'wechat':
        return (SkinAPI.getBase() === location.origin ? '' : SkinAPI.getBase()) + '/api/oauth/wechat'
      default:
        return ''
    }
  }
  async function startOAuthLogin(provider, buttonEl) {
    const errorNode = document.getElementById('auth-error')
    try {
      if (buttonEl) buttonEl.disabled = true
      const flow = await SkinAPI.oauthState(provider, 'login')
      const url = oauthAuthorizeUrl(provider, flow)
      if (!url) throw new Error('该登录方式暂不可用')
      sessionStorage.setItem('aitokensflux.oauthProvider', provider)
      location.assign(url)
    } catch (error) {
      if (errorNode) errorNode.textContent = error.message || '发起三方登录失败'
      if (buttonEl) buttonEl.disabled = false
    }
  }

  function loadTurnstile() {
    // 仅在启用时加载 Cloudflare Turnstile；站点需在 CSP 中放行 challenges.cloudflare.com
    const siteKey = platform.status?.turnstile_site_key
    if (!platform.status?.turnstile_check || !siteKey) return
    if (document.querySelector('script[src*="turnstile/v0/api.js"]')) {
      renderTurnstile()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = renderTurnstile
    document.head.append(script)
  }
  function renderTurnstile() {
    const siteKey = platform.status?.turnstile_site_key
    const box = document.getElementById('cf-turnstile')
    if (!box || !siteKey || typeof window.turnstile === 'undefined') return
    try {
      window.turnstile.render(box, {
        sitekey: siteKey,
        callback: (token) => {
          const input = document.querySelector('#auth-form [name="turnstile"], #reset-form [name="turnstile"]')
          if (input) input.value = token
        },
      })
    } catch { /* widget may already be rendered */ }
  }

  function authDialog(mode = 'login') {
    const emailVerification = Boolean(platform.status?.email_verification)
    const turnstile = Boolean(platform.status?.turnstile_check)
    const siteKey = platform.status?.turnstile_site_key
    showDialog(
      mode === 'register' ? '创建账户' : '欢迎回来',
      `<form id="auth-form" data-mode="${mode}" novalidate><label class="v6-form-label" for="auth-username">用户名</label><input class="v6-input" id="auth-username" name="username" required autocomplete="username" placeholder="用户名">${
        mode === 'register'
          ? `<label class="v6-form-label" for="auth-email">邮箱${emailVerification ? '' : '（可选）'}</label><input class="v6-input" id="auth-email" name="email" type="email" autocomplete="email" placeholder="name@example.com" ${emailVerification ? 'required' : ''}>${
              emailVerification
                ? `<div class="v6-code-row"><div><label class="v6-form-label" for="auth-email-code">邮箱验证码</label><input class="v6-input" id="auth-email-code" name="email_code" required placeholder="6 位验证码"></div>${button('send-email-code', '获取验证码', '', '', 'v6-btn')}</div>`
                : ''
            }`
          : ''
      }<div class="v6-field"><div class="v6-field-head"><label class="v6-form-label" for="auth-password">密码</label>${mode === 'login' ? button('forgot-password', '忘记密码？', '', '', 'v6-link') : ''}</div><div class="v6-input-wrap"><input class="v6-input" id="auth-password" name="password" type="password" required autocomplete="${mode === 'register' ? 'new-password' : 'current-password'}" placeholder="${mode === 'register' ? '至少 8 位' : '密码'}">${button('toggle-password', '', 'eye', 'aria-label="显示密码" aria-pressed="false"', 'v6-input-eye')}</div></div>${turnstile ? `<div id="cf-turnstile" class="v6-my-2"></div><input type="hidden" name="turnstile">${siteKey ? '' : '<label class="v6-form-label">Turnstile Token<input class="v6-input" name="turnstile_input"></label>'}` : ''}<p class="v6-error" id="auth-error" role="alert"></p><button class="v6-btn primary v6-btn-block" type="submit">${mode === 'register' ? '注册并登录' : '登录'}</button>${oauthButtons()}<p class="v6-auth-alt">${mode === 'register' ? '已有账号？' : '没有账号？'}<button type="button" class="v6-link" data-action="${mode === 'register' ? 'show-login' : 'show-register'}">${mode === 'register' ? '去登录' : '去注册'}</button></p>${mode === 'register' ? '<p class="v6-auth-terms">注册即表示同意服务条款与隐私政策。</p>' : ''}</form>`,
      mode === 'register' ? '一个账号即可调用目录中的全部模型。' : '登录以管理密钥、用量与工作区。',
    )
    // ✦ 品牌头部：品牌标记置于标题区左侧
    dialog
      .querySelector('.v6-dialog-head')
      ?.insertAdjacentHTML('afterbegin', `<span class="v6-auth-mark" aria-hidden="true">${BRAND_MARK}</span>`)
    if (turnstile && siteKey) loadTurnstile()
  }

  function resetDialog() {
    const turnstile = Boolean(platform.status?.turnstile_check)
    const siteKey = platform.status?.turnstile_site_key
    showDialog(
      '找回密码',
      `<form id="reset-form" novalidate><label class="v6-form-label" for="reset-email">邮箱</label><input class="v6-input" id="reset-email" name="email" type="email" required autocomplete="email" placeholder="注册时使用的邮箱"><div class="v6-code-row"><div><label class="v6-form-label" for="reset-code">邮箱验证码</label><input class="v6-input" id="reset-code" name="code" required placeholder="6 位验证码"></div>${button('send-reset-code', '获取验证码', '', '', 'v6-btn')}</div><label class="v6-form-label" for="reset-password">新密码</label><div class="v6-input-wrap"><input class="v6-input" id="reset-password" name="password" type="password" required autocomplete="new-password" placeholder="至少 8 位">${button('toggle-password', '', 'eye', 'aria-label="显示密码" aria-pressed="false"', 'v6-input-eye')}</div>${turnstile ? '<div id="cf-turnstile" class="v6-my-2"></div><input type="hidden" name="turnstile">' : ''}<p class="v6-error" id="reset-error" role="alert"></p><div class="v6-dialog-foot">${button('close-dialog', '取消')}<button class="v6-btn primary" type="submit">重置密码</button></div></form>`,
    )
    if (turnstile && siteKey) loadTurnstile()
  }
  async function refreshSession() {
    if (!SkinAPI.getToken()) {
      platform.authed = false
      platform.user = null
      return
    }
    platform.user = await SkinAPI.self()
    platform.authed = Boolean(platform.user && platform.user.id)
    if (platform.user?.display_name || platform.user?.username)
      state.settings.name = platform.user.display_name || platform.user.username
  }
  async function refreshTokens() {
    if (!platform.authed) {
      platform.tokens = []
      return
    }
    platform.tokens = await SkinAPI.listTokens()
  }
  function applyCatalog(next, live) {
    models.splice(0, models.length, ...next.map(cloneModel))
    catalogLive = live
    state.pins = state.pins.filter((id) => models.some((model) => model.id === id))
  }
  async function refreshCatalog() {
    try {
      const result = await SkinAPI.loadCatalog()
      applyCatalog(result.models, true)
      platform.group = result.group || platform.group
      platform.error = ''
    } catch (error) {
      if (demoEnabled) applyCatalog(mockModels, false)
      else models.splice(0, models.length)
      platform.error = error.message || '模型目录不可用'
    } finally {
      catalogReady = true
    }
  }
  function onUnauthorized() {
    if (!platform.authed) return
    platform.authed = false
    platform.user = null
    platform.tokens = []
    toast('登录已过期，请重新登录', 'info')
    authDialog('login')
    render()
  }

  async function bootPlatform() {
    try {
      platform.status = await SkinAPI.status()
      platform.online = true
      platform.error = ''
    } catch (error) {
      platform.online = false
      platform.status = null
      platform.error = error.message || '服务暂时不可达'
    }
    try {
      await refreshSession()
    } catch {
      SkinAPI.clearAuth()
      platform.authed = false
      platform.user = null
    }
    if (platform.authed) {
      try {
        platform.group = await SkinAPI.resolveFullModelGroup()
      } catch {
        platform.group = platform.user?.group || ''
      }
      try {
        await refreshTokens()
      } catch (error) {
        platform.tokens = []
        platform.error = error.message || platform.error
      }
    }
    await refreshCatalog()
    booted = true
    render()
  }
  // OL-03/07：toast 走 popover top layer（弹窗打开时不再被遮罩压住），
  // 支持 success/error/info 变体、可关闭、错误停留更久；
  // T3.3：悬停暂停计时、aria-live 按重要程度分级
  function toastContainer() {
    let box = document.getElementById('v6-toasts')
    if (!box) {
      box = document.createElement('div')
      box.id = 'v6-toasts'
      try {
        box.setAttribute('popover', 'manual')
      } catch {
        /* 不支持 popover 时退回普通容器 */
      }
      document.body.append(box)
    }
    return box
  }
  function toast(message, kind = 'success') {
    const box = toastContainer()
    try {
      if (box.showPopover && !box.matches(':popover-open')) box.showPopover()
    } catch {
      /* 已打开或环境不支持 */
    }
    const iconName = { success: 'check', error: 'info', info: 'bell' }[kind] || 'check'
    const node = document.createElement('div')
    node.className = 'v6-toast'
    node.dataset.kind = kind
    node.setAttribute('role', kind === 'error' ? 'alert' : 'status')
    node.setAttribute('aria-live', kind === 'error' ? 'assertive' : 'polite')
    node.innerHTML = `<span class="v6-toast-icon">${icon(iconName)}</span><span>${esc(message)}</span><button type="button" class="v6-toast-close" aria-label="关闭">×</button>`
    // T3.3：悬停暂停倒计时，移出继续
    let remaining = kind === 'error' ? 6000 : 3200
    let startedAt = 0
    let timer = 0
    const drop = () => node.remove()
    const start = () => {
      startedAt = Date.now()
      timer = setTimeout(drop, remaining)
    }
    node.addEventListener('mouseenter', () => {
      clearTimeout(timer)
      remaining = Math.max(0, remaining - (Date.now() - startedAt))
    })
    node.addEventListener('mouseleave', start)
    node.querySelector('.v6-toast-close').addEventListener('click', () => {
      clearTimeout(timer)
      node.remove()
    })
    box.append(node)
    start()
    while (box.children.length > 3) box.firstElementChild.remove()
    return node
  }
  // T3.3 / OL-04：就地反馈的屏幕阅读器播报（不弹 toast 的场景也保留听觉反馈）
  let liveNode = null
  function announce(message) {
    if (!liveNode) {
      liveNode = document.createElement('div')
      liveNode.id = 'v6-live'
      liveNode.className = 'v6-sr'
      liveNode.setAttribute('role', 'status')
      liveNode.setAttribute('aria-live', 'polite')
      document.body.append(liveNode)
    }
    liveNode.textContent = ''
    requestAnimationFrame(() => {
      if (liveNode) liveNode.textContent = message
    })
  }
  async function copy(value, btn) {
    try {
      await navigator.clipboard.writeText(value)
      if (btn) {
        // OL-04：有触发按钮时改为就地反馈——图标变 ✓ 1.2s + aria-live，不弹 toast
        // 带 [data-copy-icon] 槽位的按钮（如 slug 胶囊）只换图标，保留文字
        const slot = btn.querySelector('[data-copy-icon]') || btn
        const html = slot.innerHTML
        slot.innerHTML = icon('check')
        btn.classList.add('copied')
        announce('已复制到剪贴板')
        setTimeout(() => {
          if (!btn.isConnected) return
          slot.innerHTML = html
          btn.classList.remove('copied')
        }, 1200)
      } else {
        toast('已复制到剪贴板')
      }
      return true
    } catch {
      showDialog(
        '复制内容',
        `<textarea class="v6-textarea" readonly aria-label="待复制内容">${esc(value)}</textarea>`,
      )
      dialog.querySelector('textarea').select()
      return false
    }
  }
  function navigate(path) {
    if (location.hash === '#/' + path) render()
    else location.hash = '#/' + path
  }
  function updateQuery(key, value) {
    params.set(key, value)
    navigate(route + '?' + params.toString())
  }
  function searchDialog() {
    dialog.className = 'v6-dialog v6-palette'
    dialog.removeAttribute('aria-labelledby')
    dialog.setAttribute('aria-label', '搜索模型与页面')
    dialog.innerHTML = `<div class="v6-palette-head"><input class="v6-input v6-palette-input" id="global-search" type="search" placeholder="搜索模型、页面或操作…" aria-label="搜索模型、页面或操作" autocomplete="off"></div><div id="global-results" class="v6-palette-results" role="listbox"></div><div class="v6-palette-foot"><span><kbd>↑</kbd><kbd>↓</kbd> 选择</span><span><kbd>↵</kbd> 打开</span><span><kbd>esc</kbd> 关闭</span></div>`
    if (!dialog.open) {
      dialogOpener = document.activeElement
      dialog.showModal()
    }
    dialog.querySelector('#global-search').focus()
    renderSearchResults()
  }
  // T3.4：命令面板数据源与渲染
  const palettePages = () => [
    ['models', '模型目录', 'layers'],
    ['discover', '发现模型', 'compass'],
    ['providers', '提供商', 'server'],
    ['console/keys', 'API Keys', 'key-round'],
    ['console/credits', '余额与账单', 'wallet'],
    ['console/activity', '活动记录', 'activity'],
    ['docs', '文档', 'book-open'],
    ['status', '服务状态', 'activity'],
  ]
  const paletteModelMeta = (model) => {
    const price =
      model.imagePrice || model.audioPrice
        ? money(model.imagePrice || model.audioPrice)
        : model.inputRate != null
          ? `${money(model.inputRate)} / ${money(model.outputRate ?? model.inputRate)}`
          : ''
    return [model.provider, hasContext(model) ? contextLabel(model) : '', price].filter(Boolean).join(' · ')
  }
  // 最近访问的 5 条只存 path，名称/图标/价格在渲染时取实时数据，模型下线后自动剔除
  function paletteRemember(path) {
    try {
      const list = JSON.parse(localStorage.getItem('v6-palette-recent') || '[]').filter(
        (entry) => entry !== path,
      )
      list.unshift(path)
      localStorage.setItem('v6-palette-recent', JSON.stringify(list.slice(0, 5)))
    } catch {
      /* 隐私模式下静默跳过 */
    }
  }
  function paletteRecents() {
    let paths = []
    try {
      const parsed = JSON.parse(localStorage.getItem('v6-palette-recent') || '[]')
      paths = Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
    return paths
      .filter((path) => typeof path === 'string')
      .map((path) => {
        if (path.startsWith('models/')) {
          const model = getModel(path.slice(7))
          return model
            ? {
                path,
                name: model.name,
                provider: model.provider,
                meta: paletteModelMeta(model),
              }
            : null
        }
        const page = palettePages().find(([p]) => p === path)
        return page ? { path, name: page[1], symbol: page[2], meta: '' } : null
      })
      .filter(Boolean)
      .slice(0, 5)
  }
  // 命中文字用 <mark> 高亮（accent-faint 底）；未命中返回纯转义文本
  function markMatch(text, query) {
    const source = String(text ?? '')
    const index = query ? source.toLowerCase().indexOf(query) : -1
    if (index < 0) return esc(source)
    return (
      esc(source.slice(0, index)) +
      '<mark>' +
      esc(source.slice(index, index + query.length)) +
      '</mark>' +
      esc(source.slice(index + query.length))
    )
  }
  function renderSearchResults() {
    const query = document.getElementById('global-search').value.toLowerCase().trim()
    const pageMatches = palettePages()
      .filter(([path, name]) => (path + name).toLowerCase().includes(query))
      .map(([path, name, symbol]) => ({ path, name, symbol, meta: '' }))
    const modelMatches = query
      ? models
          .filter((model) =>
            (model.name + model.provider + model.slug).toLowerCase().includes(query),
          )
          .slice(0, 8)
          .map((model) => ({
            path: 'models/' + model.id,
            name: model.name,
            provider: model.provider,
            meta: paletteModelMeta(model),
          }))
      : []
    const dark = effectiveTheme() === 'dark'
    const actions = [
      {
        action: 'theme-toggle',
        name: dark ? '切换到浅色模式' : '切换到深色模式',
        symbol: dark ? 'sun' : 'moon',
        keywords: 'theme dark light 主题 深色 浅色 夜间 日间 白天 黑夜 模式 切换',
      },
      ...((state.settings.theme || 'system') !== 'system'
        ? [
            {
              action: 'theme-system',
              name: '主题跟随系统',
              symbol: 'monitor',
              keywords: 'theme system 主题 跟随系统 自动',
            },
          ]
        : []),
      {
        action: 'create-key',
        name: '新建密钥',
        symbol: 'key-round',
        keywords: 'key token api 密钥 新建 创建 keys',
      },
      {
        action: 'copy-base-url',
        name: '复制 Base URL',
        symbol: 'copy',
        keywords: 'base url endpoint 复制 接口 地址 api',
      },
    ]
    const actionMatches = actions.filter((item) =>
      (item.name + item.keywords).toLowerCase().includes(query),
    )
    let index = 0
    const linkRow = (item) =>
      `<a class="v6-command-item ${index++ === 0 ? 'active' : ''}" href="#/${esc(item.path)}" role="option" data-path="${esc(item.path)}">${item.provider ? logo(item.provider) : icon(item.symbol)}<span class="v6-command-name">${markMatch(item.name, query)}</span>${item.meta ? `<small class="v6-command-meta v6-num">${markMatch(item.meta, query)}</small>` : ''}</a>`
    const groupHtml = (label, group) =>
      group.length ? `<div class="v6-palette-group">${label}</div>${group.map(linkRow).join('')}` : ''
    const actionHtml = actionMatches.length
      ? `<div class="v6-palette-group">操作</div>${actionMatches
          .map(
            (item) =>
              `<button type="button" class="v6-command-item ${index++ === 0 ? 'active' : ''}" data-action="${item.action}" role="option">${icon(item.symbol)}<span class="v6-command-name">${markMatch(item.name, query)}</span></button>`,
          )
          .join('')}`
      : ''
    const recents = query ? [] : paletteRecents()
    const html = query
      ? groupHtml('页面', pageMatches) + groupHtml('模型', modelMatches) + actionHtml
      : groupHtml('最近', recents) + groupHtml('页面', pageMatches) + actionHtml
    document.getElementById('global-results').innerHTML =
      html || `<p class="v6-muted v6-palette-empty">${icon('search')}没有匹配「${esc(query)}」的结果。</p>`
  }

  function drawCharts() {
    const colors = getComputedStyle(document.documentElement)
    const seriesColors = ['--accent', '--info', '--warning', '--muted', '--accent-soft'].map(
      (token) => colors.getPropertyValue(token).trim(),
    )
    charts.length = 0
    app.querySelectorAll('canvas[data-chart]').forEach((canvas) => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
      const width = rect.width,
        height = rect.height,
        left = 44,
        right = 12,
        top = 12,
        bottom = 30
      const plotWidth = width - left - right,
        plotHeight = height - top - bottom
      const periodControl = app.querySelector(`[data-chart-period="${canvas.id}"]`)
      const period = periodControl
        ? Number(periodControl.value)
        : params.get('period') === 'day'
          ? 24
          : params.get('period') === 'month'
            ? 30
            : 7
      const periodScale =
        params.get('period') === 'day' ? 0.16 : params.get('period') === 'month' ? 4.4 : 1
      const logarithmic = canvas.dataset.scale === 'log'
      const detail = getModel(route.split('/')[1])
      const ranked = models
        .filter((model) => model.outputs.includes(params.get('output') || 'text'))
        .sort((a, b) => b.usage - a.usage)
      const isUsage = canvas.dataset.chart === 'usage'
      const isPerf = canvas.dataset.chart === 'performance'
      const live = liveChartData[canvas.id]
      let chartState = live?.state
      let series = live?.series || []
      let buckets = live?.buckets || []
      let tickUnit = live?.unit || ''
      // live 序列自带点数（如实测吞吐按小时分桶）；无 live 时按周期选择器
      const points = (live && live.buckets && live.buckets.length) || period
      const weights = Array.from(
        { length: points },
        (_, index) => 0.6 + (index / points) * 0.55 + Math.sin(index * 1.9) * 0.09,
      )
      const weightTotal = weights.reduce((sum, weight) => sum + weight, 0)
      if (isUsage && canvas.id === 'rankings-usage') {
        // 排行榜用量图：演示/实时目录共用 top5，全 0 时按空态处理（RK-03）
        series = ranked.slice(0, 5).map((model) => model.usage)
        tickUnit = 'B'
        const rankedTotal = series.reduce((sum, usage) => sum + usage, 0)
        if (!rankedTotal) chartState = chartState || 'empty'
        buckets = weights.map((weight) => (rankedTotal * periodScale * weight) / weightTotal)
      } else if (isUsage) {
        // 账户用量图：必须有真实数据；否则按状态占位，绝不画假数据（G-33）
        if (!chartState) chartState = platform.authed ? 'loading' : 'empty'
      } else if (!live) {
        // performance / price：演示曲线，aria-label 已注明为演示数据；有 liveChartData 时保留真实序列
        series = [12.4, 8.6, 6.2, 4.7, 2.3]
        const demoTotal = series.reduce((sum, usage) => sum + usage, 0)
        buckets = weights.map((weight) => (demoTotal * periodScale * weight) / weightTotal)
      }
      if (chartState && chartState !== 'ok') {
        setChartState(canvas, chartState)
        charts.push({ canvas, data: [], unit: tickUnit })
        return
      }
      clearChartState(canvas)
      const total = series.reduce((sum, usage) => sum + usage, 0) || 1
      // R-05：perf 演示曲线也走同一套 niceCeil，刻度全部落在整步长上
      const max = niceCeil(
        isPerf && !live
          ? parseInt(detail?.throughput || '100', 10) * 1.2
          : Math.max(...buckets, 0.000001),
      )
      ctx.font = `11px ${colors.getPropertyValue('--font-mono').trim() || 'monospace'}`
      ctx.textAlign = 'right'
      // T4.2：1px 虚线网格，降低视觉噪声
      ctx.setLineDash([3, 3])
      for (let index = 0; index <= 4; index++) {
        const y = top + (plotHeight * index) / 4
        ctx.strokeStyle = colors.getPropertyValue('--border').trim()
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(left, y)
        ctx.lineTo(width - right, y)
        ctx.stroke()
        ctx.fillStyle = colors.getPropertyValue('--muted').trim()
        const tick = logarithmic
          ? Math.expm1(Math.log1p(max) * (1 - index / 4))
          : max * (1 - index / 4)
        ctx.fillText(fmtTick(tick, tickUnit || ''), left - 8, y + 4)
      }
      ctx.setLineDash([])
      const data = []
      const unit = plotWidth / points
      for (let index = 0; index < points; index++) {
        const base =
          canvas.dataset.chart === 'performance'
            ? max * (0.67 + Math.sin(index * 1.7) * 0.06)
            : buckets[index]
        const normalized = logarithmic ? Math.log1p(base) / Math.log1p(max) : base / max
        const x = left + unit * index + unit / 2
        data.push({
          x,
          value: base,
          label:
            (live && live.times && live.times[index]) ||
            (period === 24 ? `${index}:00` : `第 ${Math.round((index * period) / points) + 1} 天`),
        })
        if (canvas.dataset.chart === 'usage') {
          let y = top + plotHeight
          const shares = series.map((usage) => usage / total)
          // T4.2：柱宽上限 24，顶部 r3
          const barWidth = Math.max(2, Math.min(unit - 4, Math.max(unit * 0.56, 6), 24))
          const barX = left + index * unit + (unit - barWidth) / 2
          const topSegment = shares.reduce((last, share, i) => (share > 0 ? i : last), -1)
          shares.forEach((share, series) => {
            const barHeight = plotHeight * normalized * share
            ctx.fillStyle = seriesColors[series]
            if (series === topSegment && ctx.roundRect && barHeight > 2) {
              ctx.beginPath()
              ctx.roundRect(barX, y - barHeight, barWidth, barHeight, [3, 3, 0, 0])
              ctx.fill()
            } else {
              ctx.fillRect(barX, y - barHeight, barWidth, barHeight)
            }
            y -= barHeight
          })
          data[index].y = y
          data[index].parts = shares.map((share) => share * base)
        }
        if (index % Math.max(1, Math.floor(points / 6), Math.ceil((points * 44) / plotWidth)) === 0) {
          ctx.fillStyle = colors.getPropertyValue('--muted').trim()
          ctx.textAlign = 'center'
          ctx.fillText(data[index].label, x, height - 8)
        }
      }
      if (canvas.dataset.chart !== 'usage') {
        // T4.2：1.75px 折线 + 8% 面积渐变
        ctx.strokeStyle = seriesColors[0]
        ctx.lineWidth = 1.75
        ctx.beginPath()
        data.forEach((point, index) => {
          const y = top + plotHeight * (1 - point.value / max)
          point.y = y
          point.parts = [point.value]
          if (index === 0) ctx.moveTo(point.x, y)
          else ctx.lineTo(point.x, y)
        })
        ctx.stroke()
        if (data.length) {
          ctx.lineTo(data[data.length - 1].x, top + plotHeight)
          ctx.lineTo(data[0].x, top + plotHeight)
          ctx.closePath()
          ctx.globalAlpha = 0.08
          ctx.fillStyle = seriesColors[0]
          ctx.fill()
          ctx.globalAlpha = 1
        }
      }
      // 系列名：排行榜图取 top5 模型名，其余单系列图给语义标签（tooltip 用）
      const names =
        canvas.id === 'rankings-usage'
          ? ranked.slice(0, 5).map((model) => model.name)
          : canvas.dataset.chart === 'usage'
            ? ['用量']
            : ['吞吐量']
      charts.push({
        canvas,
        data,
        unit: tickUnit,
        names,
        colors: seriesColors.slice(0, Math.max(names.length, 1)),
      })
    })
  }
  function observePage() {
    chartObserver?.disconnect()
    chartObserver = new ResizeObserver(drawCharts)
    app.querySelectorAll('.v6-chart').forEach((node) => chartObserver.observe(node))
    drawCharts()
    // DT-05：分区导航高亮——observer 只做触发器，回调里对全部节段重算，
    // 取"观察带内最靠上的节段"；滚到底兜底最后一节（末段太短永远进不了带）
    sectionObserver?.disconnect()
    const updateSectionActive = () => {
      if (Date.now() < sectionLockUntil) return
      const links = app.querySelectorAll('[data-section]')
      const secs = [...app.querySelectorAll('.v6-section[id]')]
      if (!links.length || !secs.length) return
      let activeId
      if (window.scrollY < 24) activeId = links[0].dataset.section
      else {
        const bandBottom = Math.min(360, window.innerHeight * 0.4)
        const inBand = secs.filter((s) => {
          const r = s.getBoundingClientRect()
          return r.top < bandBottom && r.bottom > 80
        })
        activeId = (
          inBand[0] || [...secs].reverse().find((s) => s.getBoundingClientRect().top <= 80)
        )?.id
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2)
          activeId = secs[secs.length - 1].id
      }
      if (activeId)
        links.forEach((link) => link.classList.toggle('active', link.dataset.section === activeId))
    }
    sectionObserver = new IntersectionObserver(updateSectionActive, {
      rootMargin: '-80px 0px -60% 0px',
    })
    app.querySelectorAll('.v6-section[id]').forEach((node) => sectionObserver.observe(node))
    // 到底兜底需要 scroll 事件（observer 只在进出带时触发）；先卸旧引用避免监听累积
    if (sectionActiveUpdater) window.removeEventListener('scroll', sectionActiveUpdater)
    sectionActiveUpdater = updateSectionActive
    window.addEventListener('scroll', sectionActiveUpdater, { passive: true })
    // T5.2：窄屏侧栏是横向标签条，把激活项滚入视野
    app.querySelector('.v6-side-link.active')?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }

  function render() {
    if (dialog.open) closeDialog()
    const raw = (location.hash || '#/home').slice(2)
    const queryIndex = raw.indexOf('?')
    route = queryIndex < 0 ? raw : raw.slice(0, queryIndex)
    params = new URLSearchParams(queryIndex < 0 ? '' : raw.slice(queryIndex + 1))
    if (route === 'models/anthropic-claude-3-7-sonnet') route = 'models/claude-3.7'
    const allowedRoutes = [
      'home',
      'models',
      'discover',
      'providers',
      'pricing',
      'status',
      'docs',
      'console',
      'console/activity',
      'console/keys',
      'console/credits',
      'console/settings',
      'console/profile',
      'console/logs',
      'console/notifications',
      'console/privacy',
      'console/preferences',
      ...(feature('rankings') ? ['rankings'] : []),
      ...(feature('files') ? ['console/files'] : []),
      ...(feature('guardrails') ? ['console/guardrails'] : []),
      ...(feature('byok') ? ['console/byok'] : []),
      ...(feature('routing') ? ['console/routing'] : []),
      ...(feature('presets') ? ['console/presets'] : []),
      ...(feature('tools') ? ['console/tools'] : []),
      ...(feature('observability') ? ['console/observability'] : []),
    ]
    // models/<id> 路由一律放行：模型不存在时由 renderDetail 展示"没有这个模型"空态，避免深链被静默改写
    if (!allowedRoutes.includes(route) && !route.startsWith('models/')) {
      route = 'home'
      history.replaceState(null, '', '#/home')
    }
    catalogFilter = null
    app.className = route === 'home' ? '' : 'v6-app'
    document.querySelector('.v6-footer')?.remove()
    app.innerHTML = ''
    renderHeader()
    // G-32：boot 未完成时只渲染骨架，避免闪"需要登录"/演示目录等错误内容
    if (!booted && route !== 'home') {
      app.innerHTML = `<div class="v6-shell"><div class="v6-title"><div><span class="v6-skeleton v6-skel-title"></span><span class="v6-skeleton v6-skel-sub"></span></div></div><div class="v6-skeleton v6-skel-hero"></div>${skeletonRows(5)}</div>`
      app.insertAdjacentHTML('afterend', footer())
      return
    }
    if (route === 'home') renderHome()
    else if (route === 'models') renderModels()
    else if (route.startsWith('models/')) renderDetail(routeModelId())
    else if (route === 'discover') renderDiscover()
    else if (route === 'rankings') renderRankings()
    else if (route === 'providers') renderProviders()
    else if (route === 'pricing') renderPricing()
    else if (route === 'status') renderStatus()
    else if (route === 'docs') renderDocs()
    else renderAccount()
    if (route !== 'home') app.insertAdjacentHTML('afterend', footer())
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    app.focus({ preventScroll: true })
    observePage()
    if (params.has('section'))
      requestAnimationFrame(() => document.getElementById(params.get('section'))?.scrollIntoView())
    document.title = `aitokensflux · ${route.startsWith('models/') ? getModel(routeModelId())?.name || '模型' : { home: '首页', models: '模型', discover: '发现模型', providers: '提供商', rankings: '排行榜', pricing: '价格', status: '服务状态', docs: '文档' }[route] || '工作台'}`
  }

  document.addEventListener('click', (event) => {
    const sectionLink = event.target.closest('[data-section]')
    if (sectionLink) {
      event.preventDefault()
      sectionLockUntil = Date.now() + 1200
      app
        .querySelectorAll('[data-section]')
        .forEach((link) => link.classList.toggle('active', link === sectionLink))
      document.getElementById(sectionLink.dataset.section)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    const oldRoute = event.target.closest('[data-route]')
    if (oldRoute) {
      event.preventDefault()
      navigate(oldRoute.dataset.route.replace('#/', ''))
      return
    }
    const anchor = event.target.closest('a[href^="#/"]')
    if (anchor) {
      // T3.4：面板内选中的页面/模型记入最近 5 条
      if (anchor.classList.contains('v6-command-item') && anchor.dataset.path)
        paletteRemember(anchor.dataset.path)
      if (dialog.open) closeDialog()
      if (location.hash === anchor.getAttribute('href')) {
        event.preventDefault()
        render()
      }
      return
    }
    const target = event.target.closest('[data-action]')
    if (!target) {
      document.querySelectorAll('.v6-dropdown[open]').forEach((menu) => {
        if (!menu.contains(event.target)) menu.open = false
      })
      return
    }
    const { action, id, value } = target.dataset
    if (action === 'search') searchDialog()
    else if (action === 'anchor-scroll') {
      document.getElementById(target.dataset.anchor)?.scrollIntoView({ behavior: 'smooth' })
    } else if (action === 'search-clear') {
      // data-for：空态「清除筛选」按钮直接按 id 找输入框
      const input = target.dataset.for
        ? document.getElementById(target.dataset.for)
        : target.parentElement?.querySelector('input')
      if (input) {
        input.value = ''
        input.dispatchEvent(new Event('input', { bubbles: true }))
        input.focus()
      }
    } else if (action === 'close-dialog') closeDialog()
    else if (action === 'copy') copy(target.dataset.copy, target)
    else if (action === 'copy-code')
      copy(target.closest('.v6-code').querySelector('code').textContent, target)
    else if (action === 'copy-base-url') {
      // T3.4：⌘K 操作项——复制接口地址；关面板后用 toast 反馈
      closeDialog()
      copy(apiBaseURL())
    }
    else if (action === 'pin') {
      state.pins = state.pins.includes(id)
        ? state.pins.filter((item) => item !== id)
        : [...state.pins, id]
      save()
      app.querySelectorAll(`[data-action="pin"][data-id="${esc(id)}"]`).forEach((node) => {
        const pinned = state.pins.includes(id)
        node.setAttribute('aria-pressed', pinned)
        node.setAttribute('aria-label', pinned ? '取消收藏' : '收藏模型')
        node.title = pinned ? '取消收藏' : '收藏模型'
      })
      if (catalogFilter?.pinned) filterModels()
    } else if (action === 'pinned-only') {
      catalogFilter.pinned = !catalogFilter.pinned
      target.setAttribute('aria-pressed', catalogFilter.pinned)
      filterModels()
    } else if (action === 'theme-set') {
      setTheme(target.dataset.value || 'system', target)
      toast('主题已更新')
    } else if (action === 'theme-toggle' || action === 'theme-system') {
      // 从命令面板触发时先关面板，揭幕圆心放在顶栏按钮上，与直接点按钮的观感一致
      const fromPalette = dialog.contains(target)
      if (fromPalette) closeDialog()
      const origin = fromPalette ? document.querySelector('.v6-theme-toggle') : target
      setTheme(action === 'theme-system' ? 'system' : effectiveTheme() === 'dark' ? 'light' : 'dark', origin)
    } else if (action === 'filters-reset') navigate('models')
    else if (action === 'catalog-retry')
      refreshCatalog().then(() => {
        render()
        if (!models.length && platform.error) toast(platform.error, 'error')
      })
    else if (action === 'chart-retry') {
      // 图表失败后手动重试：回到 loading 态再拉一次
      liveChartData[target.dataset.chartId] = { state: 'loading' }
      if (route === 'console') loadOverviewUsage()
      else
        loadUsageChart(
          Number(app.querySelector('[data-chart-period="account-usage"]')?.value || 7),
        )
      drawCharts()
    }
    else if (action === 'retry-rankings') loadRankings(target.dataset.period || 'week')
    else if (action === 'retry-uptime') loadUptimeStatus()
    else if (action === 'filters-open' || action === 'filters-close') {
      const panel = document.getElementById('catalog-filters')
      panel.classList.toggle('open', action === 'filters-open')
      if (action === 'filters-open') panel.querySelector('button').focus()
      else app.querySelector('[data-action="filters-open"]').focus()
    } else if (action === 'output-modality') {
      catalogFilter.output = value
      target.parentElement.querySelectorAll('[role=tab]').forEach((tab) => {
        tab.classList.toggle('active', tab === target)
        tab.setAttribute('aria-selected', tab === target)
        tab.tabIndex = tab === target ? 0 : -1
      })
      filterModels()
    } else if (action === 'pricing-modality') {
      pricingFilter.modality = value
      target.parentElement.querySelectorAll('[role=tab]').forEach((tab) => {
        tab.classList.toggle('active', tab === target)
        tab.setAttribute('aria-selected', tab === target)
        tab.tabIndex = tab === target ? 0 : -1
      })
      refreshPricing()
    } else if (action === 'pricing-clear') {
      pricingFilter = { q: '', modality: 'all' }
      renderPricing()
    } else if (action === 'model-view') {
      catalogFilter.view = value
      target.parentElement.querySelectorAll('button').forEach((node) => {
        node.classList.toggle('active', node === target)
        node.setAttribute('aria-pressed', node === target)
      })
      filterModels()
    } else if (action === 'code-language') {
      const block = target.closest('.v6-code')
      block.querySelectorAll('[data-action="code-language"]').forEach((node) => {
        node.classList.toggle('active', node === target)
        node.setAttribute('aria-pressed', node === target)
      })
      block.querySelector('code').innerHTML = highlightCode(
        codeExample(getModel(block.dataset.codeModel) || docsSampleModel, value),
        value,
      )
    } else if (action === 'provider-sort') {
      const table = document.getElementById('provider-table')
      table.dataset.sort = value
      table.innerHTML = providerTable(
        getModel(routeModelId()),
        value,
        Number(document.getElementById('provider-percentile')?.value || 50),
      )
    } else if (action === 'provider-info') {
      const name = target.dataset.name
      const available = models.filter((model) => model.hosts.includes(name))
      showDialog(
        esc(name),
        `<div class="v6-row">${logo(name, 'lg')}<p class="v6-muted">当前目录中 ${available.length} 个模型由该提供商承载。</p></div><div class="v6-stack">${available.map((model) => link('models/' + model.id, esc(model.name), 'v6-link')).join('')}</div><div class="v6-dialog-foot">${link('models?provider=' + encodeURIComponent(name), '浏览全部模型', 'v6-btn primary')}</div>`,
      )
    } else if (action === 'ranking-output') updateQuery('output', value)
    else if (action === 'ranking-period') updateQuery('period', value)
    else if (action === 'chart-scale') {
      document.getElementById('rankings-usage').dataset.scale = value
      target.parentElement.querySelectorAll('button').forEach((node) => {
        node.classList.toggle('active', node === target)
        node.setAttribute('aria-pressed', node === target)
      })
      drawCharts()
    }     else if (action === 'open-login' || action === 'show-login') authDialog('login')
    else if (action === 'show-register') authDialog('register')
    else if (action === 'logout') {
      SkinAPI.logout()
        .catch(() => SkinAPI.clearAuth())
        .finally(() => {
          platform.authed = false
          platform.user = null
          platform.tokens = []
          closeDialog()
          refreshCatalog().finally(render)
          toast('已退出登录')
        })
    } else if (action === 'create-key' || action === 'edit-key') {
      if (!platform.authed) authDialog('login')
      else keyDialog(id)
    } else if (action === 'delete-key') {
      const key = platform.tokens.find((item) => String(item.id) === String(id))
      if (!key) return
      showDialog(
        '删除密钥',
        `<p>确认删除「${esc(key.name)}」？删除后使用该密钥的请求会立即失败，此操作不可撤销。</p><div class="v6-dialog-foot">${button('close-dialog', '取消')}${button('confirm-delete-key', '删除密钥', 'trash-2', `data-id="${esc(id)}"`, 'v6-btn danger')}</div>`,
      )
    } else if (action === 'confirm-delete-key') {
      // T2.1：确认删除接入 withBusy
      withBusy(target, () =>
        SkinAPI.deleteToken(id)
          .then(async () => {
            await refreshTokens()
            closeDialog()
            renderKeys()
            toast('密钥已删除')
          })
          .catch((error) => toast(error.message || '删除密钥失败', 'error')),
      )
    } else if (action === 'refresh-credits') {
      withBusy(target, () =>
        refreshSession()
          .then(() => render())
          .then(() => toast('余额已刷新'))
          .catch((error) => toast(error.message || '刷新失败', 'error')),
      )
    } else if (action === 'redeem-code') {
      // T6.11：兑换码主入口已改余额页内联表单——表单内的该动作由 submit 接管；
      // 契约保留 data-action，其余入口（如旧模板）仍走弹窗
      if (!target.closest('#topup-inline-form'))
        showDialog(
          '兑换码',
          `<form id="topup-form" novalidate><label class="v6-form-label">兑换码<input class="v6-input" name="key" required autocomplete="off" placeholder="输入兑换码"></label><p class="v6-muted v6-small">兑换成功后余额立即到账。</p><div class="v6-dialog-foot">${button('close-dialog', '取消')}<button class="v6-btn primary" type="submit">兑换</button></div></form>`,
        )
    }
    else if (action === 'send-email-code') {
      const email = document.querySelector('#auth-form [name="email"]')?.value.trim()
      const err = document.getElementById('auth-error')
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        if (err) err.textContent = '请先填写有效邮箱'
        return
      }
      target.disabled = true
      SkinAPI.sendVerification(email, 'register', document.querySelector('#auth-form [name="turnstile"]')?.value || '')
        .then(() => {
          toast('验证码已发送')
          startCodeCountdown(target)
        })
        .catch((error) => {
          if (err) err.textContent = error.message || '发送失败'
          target.disabled = false
        })
    } else if (action === 'send-reset-code') {
      const email = document.querySelector('#reset-form [name="email"]')?.value.trim()
      const err = document.getElementById('reset-error')
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        if (err) err.textContent = '请先填写有效邮箱'
        return
      }
      target.disabled = true
      SkinAPI.sendResetEmail(email, document.querySelector('#reset-form [name="turnstile"]')?.value || '')
        .then(() => {
          toast('验证码已发送')
          startCodeCountdown(target)
        })
        .catch((error) => {
          if (err) err.textContent = error.message || '发送失败'
          target.disabled = false
        })
    } else if (action === 'toggle-password') {
      const wrap = target.closest('.v6-input-wrap')
      const input = wrap?.querySelector('input')
      if (!input) return
      const show = input.type === 'password'
      input.type = show ? 'text' : 'password'
      target.innerHTML = icon(show ? 'eye-off' : 'eye')
      target.setAttribute('aria-label', show ? '隐藏密码' : '显示密码')
      target.setAttribute('aria-pressed', String(show))
      input.focus()
    } else if (action === 'forgot-password') {
      resetDialog()
    } else if (action === 'oauth-login') {
      const provider = target.dataset.provider
      if (provider) startOAuthLogin(provider, target)
    }
    else if (action === 'activity-retry') loadActivity(liveData.logs.page || 1)
    else if (action === 'activity-prev' || action === 'activity-next') {
      const page = (liveData.logs.page || 1) + (action === 'activity-next' ? 1 : -1)
      if (page >= 1) loadActivity(page)
    } else if (action === 'logs-retry') loadLogs(liveData.logsList.page || 1)
    else if (action === 'logs-prev' || action === 'logs-next') {
      const page = (liveData.logsList.page || 1) + (action === 'logs-next' ? 1 : -1)
      if (page >= 1) loadLogs(page)
    } else if (action === 'export-activity') {
      const { query } = activityFilters()
      const rows = [['时间', '模型', '输入 tokens', '输出 tokens', '密钥', '成本', '类型']]
      const exportRows = (items) => {
        items.forEach((item) =>
          rows.push([
            formatTime(item.created_at),
            item.model_name || '',
            item.prompt_tokens || 0,
            item.completion_tokens || 0,
            item.token_name || '',
            (Number(item.quota || 0) / SkinAPI.quotaPerUnit()).toFixed(6),
            logTypeLabel(item.type),
          ]),
        )
      }
      // 拉取全部匹配页（上限 500 条）
      const fetchAll = async () => {
        for (let page = 1; page <= 25; page++) {
          const result = await SkinAPI.listLogs({ ...query, page, size: 20 })
          exportRows(result.items || [])
          if ((result.items || []).length < 20) break
        }
      }
      // T2.1：导出按钮带 busy 态
      withBusy(target, () =>
        fetchAll()
          .catch(() => {})
          .then(() => {
          const csv =
            '\uFEFF' +
            rows
              .map((row) => row.map((cell) => '"' + String(cell).replaceAll('"', '""') + '"').join(','))
              .join('\r\n')
          const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
          const download = document.createElement('a')
          download.href = url
          download.download = 'activity.csv'
          download.click()
          setTimeout(() => URL.revokeObjectURL(url), 1000)
          toast(`已导出 ${rows.length - 1} 条记录`)
        }),
      )
    } else if (action === 'logs-refresh') {
      withBusy(target, loadLogs)
    } else if (action === 'mobile-menu') {
      const navGroups = [
        [
          '产品',
          [
            ['models', '模型', 'layers'],
            ['discover', '发现模型', 'compass'],
            ['providers', '提供商', 'server'],
            ...(feature('rankings') ? [['rankings', '排行榜', 'trophy']] : []),
            ['pricing', '价格', 'circle-dollar-sign'],
            ['docs', '文档', 'book-open'],
            ['status', '服务状态', 'activity'],
          ],
        ],
        [
          '控制台',
          [
            ['console', '用量概览', 'layout-grid'],
            ['console/keys', 'API Keys', 'key-round'],
            ['console/activity', '活动记录', 'activity'],
            ['console/credits', '余额与账单', 'wallet'],
            ['console/settings', '工作区设置', 'settings'],
            ['console/profile', '个人资料', 'user'],
          ],
        ],
      ]
      dialog.className = 'v6-dialog v6-nav-sheet'
      dialog.removeAttribute('aria-labelledby')
      dialog.setAttribute('aria-label', '导航')
      // T3.5：顶部账户块（头像 / 用户名 / 余额）+ 底部主题分段开关
      const balance =
        platform.authed && typeof SkinAPI !== 'undefined'
          ? money(Number(platform.user?.quota || 0) / SkinAPI.quotaPerUnit())
          : ''
      const accountBlock = platform.authed
        ? `<div class="v6-nav-account"><span class="v6-avatar lg" aria-hidden="true">${esc(accountName().slice(0, 1))}</span><div class="v6-nav-account-meta"><strong>${esc(accountName())}</strong><span class="v6-muted v6-num">${balance}</span></div><button type="button" class="v6-btn ghost danger v6-icon-btn" data-action="logout" aria-label="退出登录" data-tip="退出登录">${icon('log-out')}</button></div>`
        : `<div class="v6-nav-account"><span class="v6-avatar lg" aria-hidden="true">${icon('user')}</span><div class="v6-nav-account-meta"><strong>未登录</strong><span class="v6-muted">登录后管理密钥与用量</span></div>${button('open-login', '登录 / 注册', 'log-in', '', 'v6-btn primary')}</div>`
      const themeValue = state.settings.theme || 'system'
      const themeSwitch = `<div class="nav-foot"><div class="v6-segment" role="radiogroup" aria-label="界面主题">${[
        ['system', '跟随系统', 'monitor'],
        ['light', '浅色', 'sun'],
        ['dark', '深色', 'moon'],
      ]
        .map(
          ([value, label, symbol]) =>
            `<button type="button" class="${themeValue === value ? 'active' : ''}" data-action="theme-set" data-value="${value}" role="radio" aria-checked="${themeValue === value}" aria-pressed="${themeValue === value}">${icon(symbol)}${label}</button>`,
        )
        .join('')}</div></div>`
      dialog.innerHTML = `${accountBlock}${navGroups
        .map(
          ([label, items]) =>
            `<div class="nav-group">${label}</div>${items
              .map(
                ([path, name, symbol]) =>
                  `<a href="#/${path}" class="${route === path ? 'active' : ''}">${icon(symbol)}${name}</a>`,
              )
              .join('')}`,
        )
        .join('')}${themeSwitch}`
      if (!dialog.open) {
        dialogOpener = document.activeElement
        dialog.showModal()
      }
      // 抽屉内「切换主题」的 toast 也要压过遮罩
      moveToastsInto(dialog)
    }
  })

  document.addEventListener('submit', (event) => {
    const form = event.target
    if (
      ![
        'key-form',
        'topup-form',
        'topup-inline-form',
        'reset-form',
        'settings-form',
        'auth-form',
      ].includes(form.id)
    )
      return
    event.preventDefault()
    const data = new FormData(form)
    if (form.id === 'auth-form') {
      const username = String(data.get('username') || '').trim()
      const password = String(data.get('password') || '')
      const turnstile =
        String(data.get('turnstile') || '').trim() ||
        String(data.get('turnstile_input') || '').trim()
      const mode = form.dataset.mode
      const errorNode = document.getElementById('auth-error')
      const emailRequired = mode === 'register' && Boolean(platform.status?.email_verification)
      // G-38：空提交逐字段提示 + 聚焦首个出错字段
      const emailVal = String(data.get('email') || '').trim()
      if (
        !fieldValidate(form, [
          ['username', !username, '请输入用户名'],
          ['email', emailRequired && !emailVal, '请输入邮箱'],
          ['password', !password, '请输入密码'],
        ])
      )
        return
      // 与后端 User 模型 validate tag 对齐：username max=20，password min=8,max=128。
      // 提前在表单内给出友好提示，避免把后端原始校验错误透传给用户。
      if (mode === 'register') {
        if (username.length > 20) {
          fieldValidate(form, [['username', true, '用户名最长 20 个字符']])
          if (errorNode) errorNode.textContent = '用户名最长 20 个字符'
          return
        }
        if (password.length < 8) {
          fieldValidate(form, [['password', true, '密码至少 8 位']])
          if (errorNode) errorNode.textContent = '密码至少 8 位'
          return
        }
        if (password.length > 128) {
          fieldValidate(form, [['password', true, '密码最长 128 位']])
          if (errorNode) errorNode.textContent = '密码最长 128 位'
          return
        }
      }
      const credentials = {
        username,
        password,
        email: emailVal,
        emailCode: String(data.get('email_code') || '').trim(),
        turnstile,
      }
      const action = mode === 'register' ? SkinAPI.register : SkinAPI.login
      withBusy(
        form.querySelector('[type="submit"]'),
        () =>
          action
            .call(SkinAPI, credentials)
            .then(async (result) => {
              if (result && result._loginChallenge) {
                if (errorNode)
                  errorNode.textContent = '此账户需要二次验证，请通过官方登录页面完成验证。'
                return
              }
              await refreshSession()
              try {
                platform.group = await SkinAPI.resolveFullModelGroup()
              } catch {
                platform.group = platform.user?.group || ''
              }
              await refreshTokens()
              await refreshCatalog()
              closeDialog()
              render()
              toast(mode === 'register' ? '注册成功，已登录' : '已登录')
            })
            .catch((error) => {
              let message = error.message || (mode === 'register' ? '注册失败' : '登录失败')
              // 后端字段校验失败时返回英文原文（Field validation for 'Password' failed on the 'min' tag），翻译成用户可读的提示
              if (/Field validation for 'Password' failed on the 'min'/.test(message)) message = '密码至少 8 位'
              else if (/Field validation for 'Password' failed on the 'max'/.test(message)) message = '密码最长 128 位'
              else if (/Field validation for 'Username' failed/.test(message)) message = '用户名最长 20 个字符'
              if (errorNode) errorNode.textContent = message
            }),
        mode === 'register' ? '注册中…' : '登录中…',
      )
      return
    }

    if (form.id === 'reset-form') {
      const email = String(data.get('email') || '').trim()
      const code = String(data.get('code') || '').trim()
      const newPassword = String(data.get('password') || '')
      const errorNode = document.getElementById('reset-error')
      if (!email || !code || !newPassword) {
        if (errorNode) errorNode.textContent = '请填写邮箱、验证码和新密码'
        return
      }
      if (newPassword.length < 8) {
        if (errorNode) errorNode.textContent = '密码至少 8 位'
        return
      }
      withBusy(form.querySelector('[type="submit"]'), () =>
        SkinAPI.resetPassword({ email, code, password: newPassword })
          .then(() => {
            closeDialog()
            toast('密码已重置，请用新密码登录')
            authDialog('login')
          })
          .catch((error) => {
            if (errorNode) errorNode.textContent = error.message || '重置失败'
          }),
      )
      return
    }

    // T6.11：兑换码支持内联表单（余额页）与弹窗表单两种载体
    if (form.id === 'topup-form' || form.id === 'topup-inline-form') {
      const key = String(data.get('key') || '').trim()
      if (!key) return
      withBusy(form.querySelector('[type="submit"]'), () =>
        SkinAPI.topup(key)
          .then(async () => {
            await refreshSession()
            closeDialog()
            render()
            toast('兑换成功，余额已更新')
          })
          .catch((error) => toast(error.message || '兑换失败', 'error')),
      )
      return
    }

    if (form.id === 'key-form') {
      const name = String(data.get('name') || '').trim()
      if (!name) return
      const expiredTime = expirySeconds(String(data.get('expiry') || '永不过期'))
      const existing = platform.tokens.find((key) => String(key.id) === String(form.dataset.id))
      const submit = form.querySelector('[type="submit"]')
      if (submit) submit.disabled = true
      const task = existing
        ? SkinAPI.updateToken(existing.id, {
            name,
            status: existing.status,
            expired_time: expiredTime,
            remain_quota: existing.remain_quota,
            unlimited_quota: existing.unlimited_quota,
            model_limits: '',
            group: existing.group || platform.group,
          }).then(async () => {
            await refreshTokens()
            closeDialog()
            renderKeys()
            toast('密钥已更新')
          })
        : SkinAPI.createToken({
            name,
            expiredTime,
            unlimitedQuota: true,
            group: platform.group,
          }).then(async (created) => {
            platform.group = created.group || platform.group
            save()
            await refreshTokens()
            renderKeys()
            revealKeyDialog(created.secret)
          })
      task.catch((error) => {
        if (submit) submit.disabled = false
        toast(error.message || '保存密钥失败', 'error')
      })
        } else if (form.id === 'settings-form') {
      const name = String(data.get('workspace')).trim()
      if (!name) return
      state.settings.name = name
      save()
      const stateNode = document.getElementById('settings-save-state')
      if (stateNode) stateNode.hidden = true
      toast('工作区设置已保存到此浏览器')
    }
  })
  document.addEventListener('input', (event) => {
    // G-38：字段重新输入即清除校验态
    const t = event.target
    if (t instanceof HTMLElement && t.hasAttribute('aria-invalid')) {
      t.removeAttribute('aria-invalid')
      const host = t.closest('.v6-field') || t.parentElement
      host?.querySelector('.v6-field-msg')?.remove()
    }
    if (t instanceof HTMLElement) {
      const clear = t.closest('.v6-search')?.querySelector('.v6-search-clear')
      if (clear) clear.disabled = !t.value
    }
    if (event.target.dataset.dirtyWatch !== undefined) {
      const stateNode = document.getElementById('settings-save-state')
      if (stateNode) stateNode.hidden = false
    }
    const id = event.target.id
    if (['model-search', 'context-range', 'price-range', 'output-price-range'].includes(id))
      filterModels()
    if (id === 'provider-search') filterProviders()
    if (id === 'pricing-search') {
      pricingFilter.q = event.target.value
      refreshPricing()
    }
    if (id === 'key-search') renderKeys()
    if (id === 'global-search') renderSearchResults()
    if (id === 'activity-search') {
      clearTimeout(activitySearchTimer)
      activitySearchTimer = setTimeout(filterActivity, 400)
    }
    if (id === 'log-search') {
      clearTimeout(activitySearchTimer)
      activitySearchTimer = setTimeout(filterLogs, 400)
    }
    if (id === 'estimate-input' || id === 'estimate-output') {
      const model = getModel(routeModelId())
      const input = Math.max(
        0,
        Math.min(10000000, Number(document.getElementById('estimate-input').value) || 0),
      )
      const output = Math.max(
        0,
        Math.min(1000000, Number(document.getElementById('estimate-output').value) || 0),
      )
      document.getElementById('estimate-cost').innerHTML = kpi(
        money((input * model.inputRate + output * model.outputRate) / 1e6),
      )
    }
  })
  document.addEventListener('change', (event) => {
    const id = event.target.id
    if (id === 'model-sort') {
      catalogFilter.sort = event.target.value
      filterModels()
    }
    if (id === 'model-variant') {
      catalogFilter.variant = event.target.value
      filterModels()
    }
    if (event.target.closest('#catalog-filters')) filterModels()
    if (id === 'provider-percentile') {
      const table = document.getElementById('provider-table')
      table.innerHTML = providerTable(
        getModel(routeModelId()),
        table.dataset.sort,
        Number(event.target.value),
      )
    }
    if (id === 'ranking-period') updateQuery('period', event.target.value)
    if (id === 'model-perf-hours') loadModelPerf(routeModelId(), Number(event.target.value))
    if (id === 'ranking-metric') updateQuery('metric', event.target.value)
    if (id === 'activity-status' || id === 'activity-period') filterActivity()
    if (id === 'log-type' || id === 'log-period' || id === 'log-token') filterLogs()
    if (event.target.dataset.chartPeriod) drawCharts()
    if (event.target.dataset.setting) {
      const key = event.target.dataset.setting
      state.settings[key] = event.target.checked
      save()
      toast('偏好已保存到此浏览器')
    }
    // KY-01：密钥启停用真正的 switch 控件（change 事件），失败时回滚勾选态
    if (event.target.dataset.keyToggle !== undefined) {
      const input = event.target
      const token = platform.tokens.find(
        (item) => String(item.id) === String(input.dataset.keyToggle),
      )
      if (!token) return
      const next = input.checked ? 1 : 2
      input.disabled = true
      SkinAPI.updateToken(token.id, { name: token.name, status: next, status_only: true })
        .then(async () => {
          await refreshTokens()
          renderKeys()
          toast(next === 1 ? '密钥已启用' : '密钥已停用')
        })
        .catch((error) => {
          input.checked = !input.checked
          input.disabled = false
          toast(error.message || '更新密钥失败', 'error')
        })
    }
  })
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      searchDialog()
    }
    if (
      event.target.id === 'global-search' &&
      ['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)
    ) {
      event.preventDefault()
      const items = [...dialog.querySelectorAll('.v6-command-item')]
      const current = items.findIndex((node) => node.classList.contains('active'))
      if (event.key === 'Enter') items[current]?.click()
      else {
        const next = (current + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length
        items.forEach((node, index) => node.classList.toggle('active', index === next))
        items[next]?.scrollIntoView({ block: 'nearest' })
      }
    }
    if (
      event.target.getAttribute('role') === 'tab' &&
      ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
    ) {
      event.preventDefault()
      const items = [...event.target.parentElement.querySelectorAll('[role=tab]')]
      const current = items.indexOf(event.target)
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? items.length - 1
            : (current + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length
      items[next].click()
      items[next].focus()
    }
    if (event.key === 'Escape') {
      document.querySelectorAll('.v6-dropdown[open]').forEach((menu) => {
        menu.open = false
        menu.querySelector('summary').focus()
      })
      document.getElementById('catalog-filters')?.classList.remove('open')
    }
  })
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect()
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        closeDialog()
    }
  })
  dialog.addEventListener('close', () => {
    if (dialogOpener?.isConnected) dialogOpener.focus()
  })
  app.addEventListener('pointermove', (event) => {
    const record = charts.find((item) => item.canvas === event.target)
    if (!record || !record.data.length) return
    const x = event.clientX - record.canvas.getBoundingClientRect().left
    const point = record.data.reduce((nearest, item) =>
      Math.abs(item.x - x) < Math.abs(nearest.x - x) ? item : nearest,
    )
    const wrap = record.canvas.parentElement
    const tooltip = wrap.querySelector('.v6-chart-tooltip')
    const cross = wrap.querySelector('.v6-chart-cross')
    tooltip.hidden = false
    // G-54：tooltip 跟随指针横向移动，不再固定在右上角
    tooltip.style.left = Math.min(Math.max(point.x, 40), record.canvas.getBoundingClientRect().width - 60) + 'px'
    // T4.2：tooltip 卡片——日期 + 各系列值（带色点）+ 多系列时合计
    const isUsage = record.canvas.dataset.chart === 'usage'
    const fmt = (value) =>
      isUsage ? fmtTick(value, record.unit || 'B') : (+value).toFixed(1) + ' tok/s'
    const rows = (record.names || [])
      .map(
        (name, i) =>
          `<span class="v6-chart-tip-row"><i data-bg="${record.colors?.[i] || 'var(--accent)'}"></i>${esc(name)}<b class="v6-num">${fmt(point.parts ? point.parts[i] ?? 0 : point.value)}</b></span>`,
      )
      .join('')
    const total =
      isUsage && (record.names || []).length > 1
        ? `<span class="v6-chart-tip-row v6-chart-tip-total">合计<b class="v6-num">${fmt(point.value)}</b></span>`
        : ''
    tooltip.innerHTML = `<b class="v6-chart-tip-title">${esc(point.label)}</b>${rows}${total}`
    if (cross) {
      // 十字准线限制在绘图区（left:44 / top:12，与 drawCharts 边距一致）
      cross.hidden = false
      cross.style.setProperty('--cx', point.x - 44 + 'px')
      cross.style.setProperty('--cy', (point.y ?? 0) - 12 + 'px')
    }
  })
  app.addEventListener('pointerout', (event) => {
    if (!event.target.matches('canvas[data-chart]')) return
    event.target.parentElement
      .querySelectorAll('.v6-chart-cross, .v6-chart-tooltip')
      .forEach((node) => (node.hidden = true))
  })
  window.addEventListener('skin:unauthorized', onUnauthorized)
  window.addEventListener('hashchange', render)
  // T5.1：顶栏细分隔线——页面滚动超过 4px 后才出现
  const siteHeader = document.querySelector('.app-header')
  const syncHeaderHairline = () => siteHeader?.classList.toggle('is-scrolled', window.scrollY > 4)
  window.addEventListener('scroll', syncHeaderHairline, { passive: true })
  syncHeaderHairline()
  render()
  bootPlatform()
})()
