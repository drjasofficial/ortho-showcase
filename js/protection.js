/**
 * Image Protection Script
 * Dr. Jaspreet Singh - Orthodontic Case Showcase
 * 
 * This script implements multiple layers of protection to prevent
 * casual copying of case images.
 */

(function() {
  'use strict';

  // ========== Disable Right-Click Context Menu ==========
  document.addEventListener('contextmenu', function(e) {
    // Check if right-click is on an image or protected element
    if (e.target.tagName === 'IMG' || 
        e.target.classList.contains('protected-image') ||
        e.target.closest('.case-image-container') ||
        e.target.closest('.gallery-item')) {
      e.preventDefault();
      return false;
    }
  });

  // ========== Disable Image Dragging ==========
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG' || 
        e.target.classList.contains('protected-image')) {
      e.preventDefault();
      return false;
    }
  });

  // ========== Disable Common Keyboard Shortcuts ==========
  document.addEventListener('keydown', function(e) {
    // Ctrl+S (Save)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      return false;
    }
    
    // F12 (DevTools)
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      return false;
    }
  });

  // ========== Disable Text Selection on Images ==========
  document.addEventListener('selectstart', function(e) {
    if (e.target.tagName === 'IMG' || 
        e.target.classList.contains('protected-image') ||
        e.target.closest('.case-image-container')) {
      e.preventDefault();
      return false;
    }
  });

  // ========== Add Protection Overlay to All Case Images ==========
  function addProtectionOverlays() {
    // Add overlay to all image containers that don't have one
    const imageContainers = document.querySelectorAll('.case-image-container, .gallery-item');
    
    imageContainers.forEach(function(container) {
      if (!container.querySelector('.image-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'image-overlay';
        overlay.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;z-index:2;';
        container.style.position = 'relative';
        container.appendChild(overlay);
      }
    });
  }

  // ========== Console Warning ==========
  console.log('%c⚠️ Warning!', 'color: red; font-size: 30px; font-weight: bold;');
  console.log('%cThis website\'s images are protected. Unauthorized copying or reproduction of clinical case images is prohibited.', 
    'color: #333; font-size: 14px;');
  console.log('%c© Dr. Jaspreet Singh - All Rights Reserved', 
    'color: #0D7377; font-size: 12px;');

  // ========== Disable Image Pointer Events ==========
  function protectImages() {
    const images = document.querySelectorAll('.protected-image');
    images.forEach(function(img) {
      img.style.pointerEvents = 'none';
      img.style.userSelect = 'none';
      img.style.webkitUserSelect = 'none';
      img.style.mozUserSelect = 'none';
      img.style.msUserSelect = 'none';
    });
  }

  // ========== Disable Touch Long Press on Mobile ==========
  document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'IMG' || 
        e.target.classList.contains('protected-image') ||
        e.target.closest('.case-image-container')) {
      e.target.style.webkitTouchCallout = 'none';
    }
  }, { passive: true });

  // ========== Initialize Protections ==========
  function init() {
    addProtectionOverlays();
    protectImages();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also run after dynamic content loads
  window.addEventListener('load', init);

})();
