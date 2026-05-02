# UX Polish QA Checklist (Home -> Product -> Cart -> Checkout -> Success)

## Home Page
### Functional checks
- [ ] Hero CTAs (`Shop Now`, `Explore Collection`) navigate correctly in EN and UR.
- [ ] Featured product cards open the correct product detail page.
- [ ] `Add to Cart` updates cart badge count immediately.
- [ ] `Order via WhatsApp` opens WhatsApp with prefilled text.
- [ ] Navbar links and mobile menu links route correctly.
- [ ] Floating WhatsApp button opens correctly and does not overlap core CTAs.
- [ ] Back navigation returns to prior scroll position.

### Microcopy checks
- [ ] Heading/subheading copy matches tone in EN and UR.
- [ ] Announcement bar text is readable and language-appropriate.
- [ ] Product card CTAs are translated and consistent (`Add to Cart`, `View Details`, WhatsApp CTA).
- [ ] No hardcoded English appears when UR is active.
- [ ] Prices render with locale formatting in EN/UR.

### RTL/visual checks
- [ ] Urdu sets `dir=rtl` and nav/menu alignment mirrors correctly.
- [ ] Navbar cart badge placement remains correct in both directions.
- [ ] Section spacing remains consistent in EN and UR.
- [ ] No clipped text in long Urdu headings/buttons.
- [ ] No horizontal overflow on mobile.

### Accessibility checks
- [ ] Keyboard tab order is logical across header, hero, and cards.
- [ ] Interactive controls have visible focus states.
- [ ] Icon-only actions have accessible labels.
- [ ] Color contrast is acceptable for gold text on dark backgrounds.

## Product Page
### Functional checks
- [ ] Product gallery main image changes when thumbnail is selected.
- [ ] Mobile thumbnail strip is scrollable and tappable.
- [ ] Quantity minus/plus works and never drops below 1.
- [ ] `Add to Cart` adds selected quantity.
- [ ] `Order via WhatsApp` opens product-specific message.
- [ ] Social watch buttons open Instagram/TikTok URLs in new tab.
- [ ] Related products link to correct product pages.
- [ ] Back navigation to collection/home works without state loss.

### Microcopy checks
- [ ] Product name, tagline, description switch correctly by language.
- [ ] Scent notes labels (`Top/Heart/Base`) are correct in EN/UR.
- [ ] Quantity action labels are localized for accessibility.
- [ ] Price + unit labels render consistently.

### RTL/visual checks
- [ ] Urdu layout reads naturally right-to-left.
- [ ] Badge and action group placement remains visually balanced in RTL.
- [ ] Sticky mobile action bar does not overlap content.
- [ ] No icon/text overlap in small widths.

### Accessibility checks
- [ ] Gallery controls are keyboard reachable.
- [ ] Buttons and links have descriptive labels.
- [ ] Focus is visible inside sticky action bar controls.

## Cart Drawer
### Functional checks
- [ ] Drawer opens from right in EN and left in UR.
- [ ] Item quantity controls update subtotal correctly.
- [ ] Removing items updates item count and totals immediately.
- [ ] Empty cart state appears when all items removed.
- [ ] `Proceed to Checkout` disabled in empty cart.
- [ ] `Continue Shopping` closes drawer.

### Microcopy checks
- [ ] Item count text uses singular/plural correctly.
- [ ] Empty cart message is translated and tone-consistent.
- [ ] Subtotal label and currency format are correct in EN/UR.

### RTL/visual checks
- [ ] Header/body/footer alignment respects text direction.
- [ ] Control spacing remains even in both directions.
- [ ] Drawer padding and scroll behavior are consistent.

### Accessibility checks
- [ ] Drawer traps focus when open.
- [ ] Escape key closes drawer.
- [ ] Screen reader labels for quantity/remove controls are localized.

## Checkout Page
### Functional checks
- [ ] Form blocks submission when cart is empty.
- [ ] Required fields enforce validation.
- [ ] PK phone format validation works (`+92` + 10 digits).
- [ ] Email validation message appears for invalid email.
- [ ] City dropdown works and displays localized city names.
- [ ] Delivery fee logic applies (flat fee / free threshold).
- [ ] Grand total updates correctly.
- [ ] `Place Order` opens success modal on valid form.
- [ ] Simulate network/submit failure path if backend is added later.
- [ ] Back navigation preserves entered form data where expected.

### Microcopy checks
- [ ] All labels/placeholders/messages are translated in EN/UR.
- [ ] Validation and helper copy tone is consistent across languages.
- [ ] Order summary line item name/qty/price content renders correctly.
- [ ] Currency formatting follows locale in both languages.

### RTL/visual checks
- [ ] Form layout mirrors correctly for Urdu.
- [ ] Label/input alignment is clean in both directions.
- [ ] No clipping for long Urdu labels or hints.
- [ ] Summary card aligns and wraps correctly on mobile.

### Accessibility checks
- [ ] Inputs are properly associated with labels.
- [ ] Validation errors are announced (`role=alert`) and visible.
- [ ] Submit button state is clear when disabled.

## Success Modal
### Functional checks
- [ ] Success modal appears after valid checkout submission.
- [ ] Modal close/continue action clears cart.
- [ ] Continue action redirects back to home page.
- [ ] Browser back after success does not restore stale cart unexpectedly.

### Microcopy checks
- [ ] Success title/message/button text is fully localized.
- [ ] Tone is consistent with checkout copy in EN and UR.

### RTL/visual checks
- [ ] Modal text direction and alignment are correct for Urdu.
- [ ] Spacing and button sizing remain stable in both languages.

### Accessibility checks
- [ ] Modal traps focus and returns focus to trigger context on close.
- [ ] Modal has readable title/description semantics.

## Cross-Browser and Devices
- [ ] Test on latest Chrome, Edge, Firefox, Safari.
- [ ] Test desktop widths (>=1280), tablet (~768), mobile (~360-430).
- [ ] Validate touch targets are >=44px for key controls.
- [ ] Verify no visual regressions in dark mode palette across browsers.
