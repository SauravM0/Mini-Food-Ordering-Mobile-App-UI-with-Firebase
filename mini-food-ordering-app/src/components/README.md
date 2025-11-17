# Reusable UI Components

This document explains the reusable UI components used in the Mini Food Ordering App.

## Component List

### AppButton
A versatile button component with multiple variants:
- **Primary**: Orange background for main actions
- **Secondary**: Red background for secondary actions
- **Outlined**: Transparent with border for subtle actions

Props:
- `text`: Button label
- `onPress`: Press handler
- `disabled`: Disable state
- `variant`: 'primary' | 'secondary' | 'outlined'
- `fullWidth`: Boolean for full-width buttons

### AppText
A text component that applies consistent typography:
- **Variants**: 'heading' | 'subheading' | 'body' | 'small'
- **Colors**: 'default' | 'muted' | 'success' | 'error'
- **Alignment**: 'left' | 'center' | 'right'

### Card
A container with elevation and rounded corners:
- Used for food items, cart items, and content blocks
- Supports padding and onPress handlers

### FoodCard
Specialized card for displaying menu items:
- Shows image, name, description, and price
- Includes "Add to Cart" button or quantity selector
- Responsive layout for different screen sizes

### QuantitySelector
Control for adjusting item quantities:
- Minus button, value display, plus button
- Disabled states at min/max values
- Compact design for easy tapping

### CartItemRow
Display component for cart items:
- Shows item name, price, and quantity
- Includes quantity selector
- Displays subtotal for each item

### PriceSummary
Cost breakdown component:
- Shows subtotal, tax, delivery, and total
- Supports optional notes
- Clear visual hierarchy with highlighted total

### InfoBanner
Status message component:
- **Types**: 'info' | 'success' | 'error' | 'warning'
- Color-coded backgrounds and borders
- Used for errors, success messages, and empty states

### ScreenContainer
Base layout component for all screens:
- Consistent padding and background
- Scrollable option for long content
- Safe area handling

## Usage Guidelines

1. **Consistency**: Use the same components across all screens
2. **Accessibility**: All interactive elements meet minimum touch target sizes
3. **Hierarchy**: Use typography variants to create clear visual hierarchy
4. **Feedback**: Provide visual feedback for all user interactions