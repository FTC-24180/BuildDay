# FTC Build Day - Decode Season

A GitHub Pages site for an FTC Decode season Build Day event. This site provides participants with:

- **Next Steps video conference links** for real-time sessions
- **Event materials** including site maps and itineraries  
- **Live announcements** and updates
- **Contact information** for event support

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Dynamic announcements and session notifications
- **Professional Styling**: Clean, modern interface appropriate for FTC events
- **Interactive Elements**: Hover effects, animations, and user-friendly navigation
- **Material Management**: Easy access to downloadable resources

## 🌐 Live Site

The site is automatically deployed via GitHub Pages at:
`https://ftc-24180.github.io/BuildDay`

## 🛠️ Local Development

To run the site locally:

1. Clone this repository
2. Open `index.html` in a web browser
3. For Jekyll features, install Jekyll and run `bundle exec jekyll serve`

## 📋 Admin Functions

The site includes JavaScript functions for real-time updates:

```javascript
// Update video conference links
updateVideoLink('opening', 'https://meet.google.com/your-meeting-id');

// Update downloadable materials
updateMaterialLink('sitemap', '/path/to/sitemap.pdf');

// Add live announcements
addBuildDayAnnouncement('New announcement message');
```

## 🎯 Purpose

This site serves as the central hub for FTC Build Day participants, providing:

1. **Session Management**: Easy access to video conferences for different activities
2. **Resource Distribution**: Centralized location for event materials
3. **Communication**: Real-time announcements and updates
4. **Organization**: Clear schedule and contact information

## 📁 File Structure

```
├── index.html          # Main page
├── styles.css          # Styling and responsive design
├── script.js           # Interactive functionality
├── _config.yml         # GitHub Pages configuration
└── README.md           # This file
```

## 🤝 Contributing

To add materials or update content:

1. Upload files to the repository
2. Update links in `script.js` using the admin functions
3. Commit changes to automatically deploy via GitHub Pages

---

**FTC Team 24180** | Part of the FIRST Tech Challenge Decode Season