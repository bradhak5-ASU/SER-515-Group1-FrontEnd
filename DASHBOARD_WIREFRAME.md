# Dashboard Page Wireframe & Mockup

## Overview
This document describes the responsive dashboard layout with scrollable columns for task management.

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              HEADER                                     │
│  [Logo]  Dashboard  [Create Idea Button]  [User Menu]                  │
├─────────────────────────────────────────────────────────────────────────┤
│                          SEARCH BAR                                      │
│  [🔍 Search Input]                                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ PROPOSED │ │  NEEDS   │ │    IN    │ │  READY   │ │ SPRINT   │    │
│  │  (Gray)  │ │REFINEMENT│ │REFINEMENT│ │TO COMMIT │ │  READY   │    │
│  │          │ │  (Blue)  │ │ (Yellow) │ │(Purple)  │ │ (Green)  │    │
│  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤    │
│  │[Task 1]  │ │[Task 1]  │ │[Task 1]  │ │[Task 1]  │ │[Task 1]  │    │
│  │[Task 2]  │ │[Task 2]  │ │          │ │[Task 2]  │ │[Task 2]  │    │
│  │[Task 3]  │ │          │ │   [↑]    │ │          │ │[Task 3]  │    │
│  │   ⬇️      │ │   [↑]    │ │   [↓]    │ │   [↑]    │ │   ⬇️      │    │
│  │[Task 4]  │ │   [↓]    │ │          │ │   [↓]    │ │          │    │
│  │[Task 5]  │ │          │ │          │ │          │ │   [↑]    │    │
│  │   ⬇️      │ │          │ │          │ │          │ │   [↓]    │    │
│  │[Task 6]  │ │          │ │          │ │          │ │          │    │
│  │[Task 7]  │ │          │ │          │ │          │ │          │    │
│  │[Task 8]  │ │          │ │          │ │          │ │          │    │
│  │[Task 9]  │ │          │ │          │ │          │ │          │    │
│  │[Task 10] │ │          │ │          │ │          │ │          │    │
│  │   [↑]    │ │          │ │          │ │          │ │          │    │
│  │   [↓]    │ │          │ │          │ │          │ │          │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
│                                                                          │
│  [← Horizontal Scroll →]                                                │
└─────────────────────────────────────────────────────────────────────────┘
```

**Note**: Column width is fixed at 256px (w-64). When a column has more tasks than can fit in the visible area (typically 3-4 tasks), the column becomes scrollable vertically. The "Proposed" column has 10 tasks for testing scroll functionality.

## Column Dimensions

### Column Width
- **Fixed Width**: 256px (w-64)
- **Reasoning**: Compact design allows more columns to fit on screen while maintaining readability
- **Previous Width**: 288px (min-w-72) - reduced for better space utilization

### Column Height
- **Height**: Flexible, fills available viewport height
- **Calculation**: `100vh - Header Height - Search Bar Height - Padding`
- **Behavior**: Columns stretch to fill available vertical space

### Layout Behavior
- **Container**: Flexbox layout with horizontal scroll
- **All Screen Sizes**: Columns maintain fixed 256px width
- **Horizontal Scroll**: Enabled when total column width exceeds viewport width
- **Vertical Scroll**: Individual columns scroll when tasks exceed visible area

## Column Structure

### Column Header (Fixed)
```
┌─────────────────────────────────────┐
│ [●] Column Title    [+][⋯]          │
├─────────────────────────────────────┤
```
- **Status Dot**: Colored indicator (gray, blue, yellow, purple, green)
- **Title**: Column name (Proposed, Needs Refinement, etc.)
- **Actions**: Plus button (+), More options (⋯)

### Column Body (Scrollable)
```
│ ┌─────────────────────────────┐    │
│ │ [Task Card 1]               │    │
│ └─────────────────────────────┘    │
│ ┌─────────────────────────────┐    │
│ │ [Task Card 2]               │    │
│ └─────────────────────────────┘    │
│ ┌─────────────────────────────┐    │
│ │ [Task Card 3]               │    │  ← Visible Area
│ └─────────────────────────────┘    │    (3-4 tasks typically)
│         ⬇️ Scroll ⬇️                │
│ ┌─────────────────────────────┐    │
│ │ [Task Card 4]               │    │
│ └─────────────────────────────┘    │
│ ┌─────────────────────────────┐    │
│ │ [Task Card 5]               │    │  ← Scrollable Area
│ └─────────────────────────────┘    │
│         ...more tasks...            │
│ ┌─────────────────────────────┐    │
│ │ [Task Card 10]              │    │
│ └─────────────────────────────┘    │
│         [Scrollbar] →               │
└─────────────────────────────────────┘
```

**Features**:
- **Fixed Column Width**: 256px (w-64) - narrower than previous 288px
- **Vertical Scrolling**: When tasks exceed visible area (typically ~3-4 tasks visible)
- **Scroll Trigger**: Automatically activates when more than 3-4 tasks are in a column
- **Touch-friendly**: Smooth scrolling on mobile devices with `-webkit-overflow-scrolling: touch`
- **Desktop Scrolling**: Smooth cursor/mouse wheel scrolling
- **Custom Scrollbar**: 8px width, rounded, gray - appears on hover or when scrolling
- **Empty State**: Shows "No tasks yet. Click + to add one." when column is empty
- **Test Column**: "Proposed" column contains 10 tasks for testing scroll functionality

## Task Card Structure

```
┌─────────────────────────────────────┐
│ Task Title                    [⋯]   │
│ Task Description                    │
│ [Tags: Backend, Security]           │
│ Assignee: Balaji                    │
└─────────────────────────────────────┘
```

## Scrolling Behavior

### Vertical Scrolling (Within Columns)
- **Trigger**: When task cards exceed visible column height (typically after 3-4 tasks)
- **Example**: "Proposed" column has 10 tasks, but only ~3-4 are visible at a time
- **Method**: 
  - Desktop: Mouse wheel, trackpad, or click-and-drag scrollbar
  - Mobile: Touch swipe (vertical)
- **Indicator**: Custom scrollbar appears on the right side (8px width, gray)
- **Smoothness**: Native smooth scrolling with `-webkit-overflow-scrolling: touch`
- **Behavior**: Each column scrolls independently

### Horizontal Scrolling (Between Columns)
- **Trigger**: When total column width (5 columns × 256px + gaps) exceeds viewport width
- **Column Width**: Fixed at 256px per column
- **Method**:
  - Desktop: Mouse wheel (horizontal), trackpad swipe, or horizontal scrollbar
  - Mobile: Touch swipe (horizontal)
- **Indicator**: Browser default horizontal scrollbar (if enabled)
- **Behavior**: All columns maintain fixed width; container scrolls horizontally

## Technical Implementation

### Key Changes from Previous Version

1. **Column Width**: Reduced from 288px (min-w-72) to 256px (w-64)
2. **Layout**: Changed from CSS Grid to Flexbox for column container
3. **Fixed Width**: Columns now have fixed width instead of minimum width
4. **Test Data**: Added 10 tasks to "Proposed" column to demonstrate scrolling

### CSS Classes Used

#### Dashboard Container
```css
flex flex-col h-screen bg-white overflow-hidden
```

#### Columns Section
```css
flex-1 overflow-x-auto overflow-y-hidden p-4
```

#### Columns Container (Flexbox Layout)
```css
flex gap-4 items-stretch h-full
width: max-content
```

#### Column Container
```css
flex flex-col h-full w-64 border border-gray-100 rounded-lg bg-gray-50 overflow-hidden
```
**Note**: Changed from `min-w-72` (288px) to `w-64` (256px) for narrower columns

#### Column Header
```css
flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0
```

#### Column Body (Scrollable)
```css
flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 custom-scrollbar
```

### Custom Scrollbar Styles
- **Width**: 8px
- **Track Color**: Light gray (#F3F4F6)
- **Thumb Color**: Medium gray (#D1D5DB)
- **Thumb Hover**: Darker gray (#9CA3AF)
- **Border Radius**: 4px (rounded)

## User Interactions

### Creating Tasks
1. Click **+** button on any column header
2. Modal opens with task creation form
3. Fill in: Title, Description, Assignee (dropdown), Tags (text input)
4. Click "Save Task"
5. Task appears in the selected column

### Creating Ideas
1. Click **"Create Idea"** button in header
2. Modal opens with idea creation form
3. Fill in: Title, Description, Assignee (dropdown), Tags (checkboxes)
4. Click "Save Idea"
5. Idea appears in "Proposed" column

### Viewing Tasks
- Scroll vertically within a column to see all tasks
- Scroll horizontally to view different columns
- Empty columns show "No tasks yet. Click + to add one."

## Accessibility Features

1. **Keyboard Navigation**: Tab through interactive elements
2. **Scroll Indicators**: Visual scrollbars for scrollable areas
3. **Touch Targets**: Minimum 44px × 44px for buttons
4. **Contrast**: Sufficient color contrast for text and backgrounds
5. **Screen Readers**: Semantic HTML and ARIA labels

## Browser Compatibility

- **Chrome/Edge**: Full support (custom scrollbars, smooth scrolling)
- **Firefox**: Full support (scrollbar-width: thin)
- **Safari**: Full support (webkit scrollbar styles, touch scrolling)
- **Mobile Browsers**: Touch scrolling enabled with `-webkit-overflow-scrolling: touch`

## Performance Considerations

1. **Virtual Scrolling**: Not implemented (consider for 100+ tasks per column)
2. **Lazy Loading**: Tasks loaded on initial render
3. **Smooth Scrolling**: Hardware-accelerated with CSS properties
4. **Overscroll Behavior**: Contained to prevent page scroll interference

## Future Enhancements

1. **Drag and Drop**: Move tasks between columns
2. **Column Reordering**: Rearrange columns horizontally
3. **Column Collapse**: Minimize columns to save space
4. **Infinite Scroll**: Load more tasks as user scrolls
5. **Virtual Scrolling**: For columns with 100+ tasks
6. **Horizontal Scroll Indicators**: Show arrows or dots for column navigation
7. **Column Filters**: Filter tasks within columns
8. **Column Search**: Search within specific columns

