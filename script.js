// Build Day Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Video conference links management
    const videoLinks = {
        'opening': 'https://meet.google.com/abc-defg-hij', // Placeholder links
        'workshop': 'https://meet.google.com/klm-nopq-rst',
        'strategy': 'https://meet.google.com/uvw-xyza-bcd',
        'closing': 'https://meet.google.com/efg-hijk-lmn'
    };
    
    // Material download links
    const materialLinks = {
        'sitemap': '#', // These would be actual file paths when materials are uploaded
        'itinerary': '#',
        'resources': '#',
        'rules': '#'
    };
    
    // Initialize video conference links
    function initializeVideoLinks() {
        const videoLinkElements = document.querySelectorAll('.video-link');
        videoLinkElements.forEach(link => {
            const session = link.getAttribute('data-session');
            if (videoLinks[session]) {
                link.href = videoLinks[session];
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
            
            // Add click event for tracking
            link.addEventListener('click', function(e) {
                // In a real implementation, you might want to track clicks
                console.log(`Video conference accessed: ${session}`);
                
                // Show joining message
                showNotification(`Opening ${session} video conference...`, 'info');
            });
        });
    }
    
    // Initialize material download links
    function initializeMaterialLinks() {
        const materialLinkElements = document.querySelectorAll('.download-link');
        materialLinkElements.forEach(link => {
            const material = link.getAttribute('data-material');
            if (materialLinks[material]) {
                link.href = materialLinks[material];
                
                // For now, prevent default since links are placeholders
                if (materialLinks[material] === '#') {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        showNotification(`${material} download will be available soon!`, 'warning');
                    });
                }
            }
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'info' ? '#4299e1' : type === 'warning' ? '#ed8936' : '#e53e3e'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                margin: 0;
                line-height: 1;
            }
        `;
        
        if (!document.querySelector('#notification-styles')) {
            style.id = 'notification-styles';
            document.head.appendChild(style);
        }
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        document.body.appendChild(notification);
    }
    
    // Real-time announcements system
    function addAnnouncement(message, timestamp = null) {
        const announcementBoard = document.querySelector('.announcement-board');
        if (!announcementBoard) return;
        
        const announcement = document.createElement('div');
        announcement.className = 'announcement';
        
        const currentTime = timestamp || new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        announcement.innerHTML = `
            <span class="timestamp">${currentTime}</span>
            <p>${message}</p>
        `;
        
        // Add to the top of announcements (after the first child which might be a header)
        const firstAnnouncement = announcementBoard.querySelector('.announcement');
        if (firstAnnouncement) {
            announcementBoard.insertBefore(announcement, firstAnnouncement);
        } else {
            announcementBoard.appendChild(announcement);
        }
        
        // Animate the new announcement
        announcement.style.opacity = '0';
        announcement.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            announcement.style.transition = 'all 0.3s ease';
            announcement.style.opacity = '1';
            announcement.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Check for session times and show appropriate notifications
    function checkSessionTimes() {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // minutes since midnight
        
        const sessions = [
            { name: 'Opening Session', start: 9 * 60, end: 9 * 60 + 30, id: 'opening' },
            { name: 'Technical Workshop', start: 10 * 60, end: 12 * 60, id: 'workshop' },
            { name: 'Strategy Session', start: 13 * 60, end: 14 * 60 + 30, id: 'strategy' },
            { name: 'Closing & Next Steps', start: 15 * 60, end: 16 * 60, id: 'closing' }
        ];
        
        sessions.forEach(session => {
            // Check if session is starting in 10 minutes
            if (currentTime >= session.start - 10 && currentTime < session.start) {
                addAnnouncement(`🔔 ${session.name} starts in 10 minutes!`);
            }
            
            // Check if session is currently active
            if (currentTime >= session.start && currentTime < session.end) {
                // Highlight the current session
                const sessionCard = document.querySelector(`[data-session="${session.id}"]`)?.closest('.link-card');
                if (sessionCard && !sessionCard.classList.contains('current-session')) {
                    sessionCard.classList.add('current-session');
                    sessionCard.style.borderColor = '#38a169';
                    sessionCard.style.background = '#f0fff4';
                }
            }
        });
    }
    
    // Update announcements with sample content
    function initializeSampleAnnouncements() {
        // Clear existing announcements first (except the initial one)
        const existingAnnouncements = document.querySelectorAll('.announcement');
        existingAnnouncements.forEach((ann, index) => {
            if (index > 0) ann.remove(); // Keep the first one
        });
        
        // Add some sample announcements
        //setTimeout(() => {
        //    addAnnouncement('📶 WiFi network "BuildDay2024" is now available. Password: FTC2024!', '8:45 AM');
        //}, 1000);
        
        //setTimeout(() => {
        //    addAnnouncement('🍕 Lunch will be served from 12:00 PM to 1:00 PM in the main hall.', '8:50 AM');
        //}, 2000);
    }
    
    // Function to update video conference links (for admin use)
    window.updateVideoLink = function(session, url) {
        videoLinks[session] = url;
        const linkElement = document.querySelector(`[data-session="${session}"]`);
        if (linkElement) {
            linkElement.href = url;
            showNotification(`${session} video link updated!`, 'info');
        }
    };
    
    // Function to update material links (for admin use)
    window.updateMaterialLink = function(material, url) {
        materialLinks[material] = url;
        const linkElement = document.querySelector(`[data-material="${material}"]`);
        if (linkElement) {
            linkElement.href = url;
            linkElement.onclick = null; // Remove the preventDefault
            showNotification(`${material} download link updated!`, 'info');
        }
    };
    
    // Function to add new announcements (for admin use)
    window.addBuildDayAnnouncement = function(message) {
        addAnnouncement(message);
        showNotification('New announcement added!', 'info');
    };
    
    // Initialize everything
    initializeVideoLinks();
    initializeMaterialLinks();
    initializeSampleAnnouncements();
    
    // Check session times every minute
    //checkSessionTimes();
    //setInterval(checkSessionTimes, 60000);
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Console message for developers
    console.log('🤖 FTC Build Day site loaded successfully!');
    console.log('📞 Admin functions available:');
    console.log('  - updateVideoLink(session, url)');
    console.log('  - updateMaterialLink(material, url)');
    console.log('  - addBuildDayAnnouncement(message)');
});