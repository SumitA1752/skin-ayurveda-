/**
 * SkinAyurveda Chatbot Widget - Embed Script
 * Add this script to any HTML page to include the chatbot widget
 */

(function() {
    'use strict';
    
    // Prevent multiple inclusions
    if (window.skinAyurvedaChatbot) {
        return;
    }
    
    // CSS for the chatbot widget
    const chatbotCSS = `
        /* SkinAyurveda Chatbot Widget Styles */
        :root {
            --sa-primary-color: #1C4942;
            --sa-secondary-color: #F7F0F2;
            --sa-text-color: #7B798C;
            --sa-accent-color: #24544B;
            --sa-accent-secondary-color: #FEF7F8;
            --sa-white-color: #FFFFFF;
            --sa-default-font: "DM Sans", sans-serif;
        }

        /* Chatbot Icon - Fixed position bottom-right */
        .sa-chatbot-icon {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: var(--sa-accent-color);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(28, 73, 66, 0.3);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease-in-out;
            animation: sa-pulse 2s infinite;
        }

        .sa-chatbot-icon:hover {
            background: var(--sa-primary-color);
            transform: scale(1.1);
        }

        .sa-chatbot-icon svg {
            width: 30px;
            height: 30px;
            fill: var(--sa-white-color);
        }

        @keyframes sa-pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(36, 84, 75, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(36, 84, 75, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(36, 84, 75, 0);
            }
        }

        /* Chatbot Window */
        .sa-chatbot-window {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: var(--sa-white-color);
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            z-index: 1000000;
            display: none;
            flex-direction: column;
            overflow: hidden;
            font-family: var(--sa-default-font);
            border: 2px solid var(--sa-secondary-color);
        }

        .sa-chatbot-window.open {
            display: flex;
            animation: sa-slideUp 0.3s ease-out;
        }

        @keyframes sa-slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Chatbot Header */
        .sa-chatbot-header {
            background: linear-gradient(135deg, var(--sa-primary-color) 0%, var(--sa-accent-color) 100%);
            color: var(--sa-white-color);
            padding: 20px;
            border-radius: 20px 20px 0 0;
            position: relative;
        }

        .sa-chatbot-header h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }

        .sa-chatbot-header p {
            margin: 5px 0 0 0;
            font-size: 12px;
            opacity: 0.8;
        }

        .sa-chatbot-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            color: var(--sa-white-color);
            cursor: pointer;
            font-size: 24px;
            padding: 0;
            line-height: 1;
        }

        /* Chat Messages Area */
        .sa-chatbot-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: var(--sa-accent-secondary-color);
        }

        .sa-message {
            margin-bottom: 15px;
            display: flex;
            align-items: flex-start;
        }

        .sa-message.bot {
            justify-content: flex-start;
        }

        .sa-message.user {
            justify-content: flex-end;
        }

        .sa-message-bubble {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 18px;
            font-size: 14px;
            line-height: 1.4;
            white-space: pre-line;
        }

        .sa-message.bot .sa-message-bubble {
            background: var(--sa-white-color);
            color: var(--sa-text-color);
            border: 1px solid var(--sa-secondary-color);
            margin-left: 10px;
        }

        .sa-message.user .sa-message-bubble {
            background: var(--sa-accent-color);
            color: var(--sa-white-color);
        }

        .sa-bot-avatar {
            width: 32px;
            height: 32px;
            background: var(--sa-primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .sa-bot-avatar svg {
            width: 18px;
            height: 18px;
            fill: var(--sa-white-color);
        }

        /* Quick Options */
        .sa-quick-options {
            padding: 10px 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .sa-quick-option {
            background: var(--sa-secondary-color);
            border: 1px solid var(--sa-accent-color);
            color: var(--sa-accent-color);
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .sa-quick-option:hover {
            background: var(--sa-accent-color);
            color: var(--sa-white-color);
        }

        /* Chat Input */
        .sa-chatbot-input {
            padding: 20px;
            border-top: 1px solid var(--sa-secondary-color);
            background: var(--sa-white-color);
        }

        .sa-input-container {
            display: flex;
            align-items: center;
            background: var(--sa-accent-secondary-color);
            border-radius: 25px;
            padding: 5px;
            border: 1px solid var(--sa-secondary-color);
        }

        .sa-chat-input {
            flex: 1;
            border: none;
            outline: none;
            background: transparent;
            padding: 10px 15px;
            font-size: 14px;
            color: var(--sa-text-color);
            font-family: var(--sa-default-font);
        }

        .sa-chat-input::placeholder {
            color: var(--sa-text-color);
            opacity: 0.7;
        }

        .sa-send-button {
            width: 35px;
            height: 35px;
            background: var(--sa-accent-color);
            border: none;
            border-radius: 50%;
            color: var(--sa-white-color);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .sa-send-button:hover {
            background: var(--sa-primary-color);
        }

        .sa-send-button svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }

        /* Typing indicator */
        .sa-typing-indicator {
            display: none;
        }

        .sa-typing-indicator.show {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }

        .sa-typing-dots {
            display: flex;
            gap: 3px;
            margin-left: 10px;
        }

        .sa-typing-dot {
            width: 6px;
            height: 6px;
            background: var(--sa-text-color);
            border-radius: 50%;
            opacity: 0.4;
            animation: sa-typingAnimation 1.4s infinite;
        }

        .sa-typing-dot:nth-child(1) { animation-delay: 0s; }
        .sa-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .sa-typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes sa-typingAnimation {
            0%, 60%, 100% { opacity: 0.4; }
            30% { opacity: 1; }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .sa-chatbot-window {
                width: 280px;
                height: 450px;
            }
        }

        @media (max-width: 480px) {
            .sa-chatbot-window {
                bottom: 80px;
                left: 10px;
                right: 10px;
                width: auto;
                height: 400px;
            }
            
            .sa-chatbot-icon {
                bottom: 15px;
                right: 15px;
                width: 55px;
                height: 55px;
            }
        }
    `;

    // HTML template for the chatbot
    const chatbotHTML = `
        <!-- SkinAyurveda Chatbot Icon -->
        <div class="sa-chatbot-icon" id="saChatbotIcon">
            <svg viewBox="0 0 24 24">
                <path d="M20,2H4A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H6L10,22L14,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H13.9L10,19.9L6.1,16H4V4H20V16Z"/>
                <circle cx="8" cy="10" r="1.5"/>
                <circle cx="12" cy="10" r="1.5"/>
                <circle cx="16" cy="10" r="1.5"/>
            </svg>
        </div>

        <!-- SkinAyurveda Chatbot Window -->
        <div class="sa-chatbot-window" id="saChatbotWindow">
            <!-- Header -->
            <div class="sa-chatbot-header">
                <h3>SkinAyurveda Assistant</h3>
                <p>Dr. Vaishali Sapat's Clinic • Online</p>
                <button class="sa-chatbot-close" id="saChatbotClose">&times;</button>
            </div>

            <!-- Messages Area -->
            <div class="sa-chatbot-messages" id="saChatbotMessages">
                <!-- Messages will be added here -->
            </div>

            <!-- Typing Indicator -->
            <div class="sa-typing-indicator" id="saTypingIndicator">
                <div class="sa-bot-avatar">
                    <svg viewBox="0 0 24 24">
                        <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A4,4 0 0,1 17,11V18A4,4 0 0,1 13,22H11A4,4 0 0,1 7,18V11A4,4 0 0,1 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M9,11V18A2,2 0 0,0 11,20H13A2,2 0 0,0 15,18V11A2,2 0 0,0 13,9H11A2,2 0 0,0 9,11Z"/>
                    </svg>
                </div>
                <div class="sa-typing-dots">
                    <div class="sa-typing-dot"></div>
                    <div class="sa-typing-dot"></div>
                    <div class="sa-typing-dot"></div>
                </div>
            </div>

            <!-- Quick Options -->
            <div class="sa-quick-options" id="saQuickOptions">
                <button class="sa-quick-option" data-message="Tell me about skin treatments">Skin Treatments</button>
                <button class="sa-quick-option" data-message="What hair treatments do you offer?">Hair Treatments</button>
                <button class="sa-quick-option" data-message="How can I book an appointment?">Book Appointment</button>
                <button class="sa-quick-option" data-message="Where is your clinic located?">Location</button>
            </div>

            <!-- Input Area -->
            <div class="sa-chatbot-input">
                <div class="sa-input-container">
                    <input type="text" class="sa-chat-input" id="saChatInput" placeholder="Ask about our treatments..." maxlength="200">
                    <button class="sa-send-button" id="saSendButton">
                        <svg viewBox="0 0 24 24">
                            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Chatbot JavaScript Class
    class SkinAyurvedaChatbot {
        constructor() {
            this.isOpen = false;
            this.init();
        }

        init() {
            this.injectStyles();
            this.injectHTML();
            this.bindElements();
            this.bindEvents();
            this.addWelcomeMessage();
        }

        injectStyles() {
            const style = document.createElement('style');
            style.textContent = chatbotCSS;
            document.head.appendChild(style);
        }

        injectHTML() {
            const container = document.createElement('div');
            container.innerHTML = chatbotHTML;
            document.body.appendChild(container);
        }

        bindElements() {
            this.chatbotIcon = document.getElementById('saChatbotIcon');
            this.chatbotWindow = document.getElementById('saChatbotWindow');
            this.chatbotClose = document.getElementById('saChatbotClose');
            this.chatbotMessages = document.getElementById('saChatbotMessages');
            this.chatInput = document.getElementById('saChatInput');
            this.sendButton = document.getElementById('saSendButton');
            this.quickOptions = document.getElementById('saQuickOptions');
            this.typingIndicator = document.getElementById('saTypingIndicator');
        }

        bindEvents() {
            this.chatbotIcon.addEventListener('click', () => this.toggleChat());
            this.chatbotClose.addEventListener('click', () => this.closeChat());
            this.sendButton.addEventListener('click', () => this.handleSend());
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleSend();
            });
            
            this.quickOptions.addEventListener('click', (e) => {
                if (e.target.classList.contains('sa-quick-option')) {
                    const message = e.target.dataset.message;
                    this.sendMessage(message, 'user');
                    this.handleBotResponse(message);
                }
            });
        }

        toggleChat() {
            if (this.isOpen) {
                this.closeChat();
            } else {
                this.openChat();
            }
        }

        openChat() {
            this.chatbotWindow.classList.add('open');
            this.isOpen = true;
            this.chatInput.focus();
        }

        closeChat() {
            this.chatbotWindow.classList.remove('open');
            this.isOpen = false;
        }

        addWelcomeMessage() {
            const welcomeMessage = "Hi! I'm your SkinAyurveda assistant. 😊 How can I help you today? You can ask about our treatments, book an appointment, or get clinic information.";
            this.addMessage(welcomeMessage, 'bot');
        }

        handleSend() {
            const message = this.chatInput.value.trim();
            if (!message) return;

            this.sendMessage(message, 'user');
            this.chatInput.value = '';
            this.handleBotResponse(message);
        }

        sendMessage(message, sender) {
            this.addMessage(message, sender);
            this.scrollToBottom();
        }

        addMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.className = `sa-message ${sender}`;
            
            if (sender === 'bot') {
                messageElement.innerHTML = `
                    <div class="sa-bot-avatar">
                        <svg viewBox="0 0 24 24">
                            <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A4,4 0 0,1 17,11V18A4,4 0 0,1 13,22H11A4,4 0 0,1 7,18V11A4,4 0 0,1 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M9,11V18A2,2 0 0,0 11,20H13A2,2 0 0,0 15,18V11A2,2 0 0,0 13,9H11A2,2 0 0,0 9,11Z"/>
                        </svg>
                    </div>
                    <div class="sa-message-bubble">${message}</div>
                `;
            } else {
                messageElement.innerHTML = `<div class="sa-message-bubble">${message}</div>`;
            }

            this.chatbotMessages.appendChild(messageElement);
        }

        showTyping() {
            this.typingIndicator.classList.add('show');
            this.scrollToBottom();
        }

        hideTyping() {
            this.typingIndicator.classList.remove('show');
        }

        scrollToBottom() {
            this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        }

        handleBotResponse(userMessage) {
            this.showTyping();
            
            setTimeout(() => {
                this.hideTyping();
                const response = this.generateResponse(userMessage);
                this.addMessage(response, 'bot');
                this.scrollToBottom();
            }, 1000 + Math.random() * 1000);
        }

        generateResponse(message) {
            const lowercaseMessage = message.toLowerCase();
            
            // Skin treatments
            if (this.containsAny(lowercaseMessage, ['skin', 'acne', 'pimple', 'melasma', 'pigmentation', 'facial', 'glow'])) {
                return `At SkinAyurveda, we offer comprehensive skin treatments including:

• Acne & Pimple Treatment
• Melasma & Pigmentation Removal  
• Chemical Peels & HydraFacials
• Skin Brightening & Anti-aging
• Dark Circle Treatment

Dr. Vaishali Sapat has 11+ years of experience in advanced dermatology. Would you like to book a consultation? Call us at +91 83809 12667.`;
            }
            
            // Hair treatments
            if (this.containsAny(lowercaseMessage, ['hair', 'baldness', 'alopecia', 'hair fall', 'prp', 'gfc'])) {
                return `Our advanced hair treatments include:

• Hair Fall Control Therapy
• PRP & GFC Treatment 
• Alopecia & Baldness Solutions
• Early Hair Graying and Dandruff Treatment
• Laser Hair Reduction

We use the latest technology with personalized treatment plans. Our success rate is excellent with 4.9⭐ rating from 159+ patients!`;
            }
            
            // Appointment booking
            if (this.containsAny(lowercaseMessage, ['appointment', 'book', 'consultation', 'visit', 'schedule'])) {
                return `📞 To book your appointment with Dr. Vaishali Sapat:

• Call: +91 83809 12667
• Email: skinayurveda11@gmail.com  
• Visit: Shop No. 11, Chowrang Residency, Govind Ranade Rd, Hadapsar, Pune - 411028

We're open for consultations and our team will help you schedule at your convenience. Online booking is also available on our website!`;
            }
            
            // Location and clinic info
            if (this.containsAny(lowercaseMessage, ['location', 'address', 'where', 'clinic', 'direction'])) {
                return `📍 SkinAyurveda Hair Skin Laser Clinic

Address: Shop No. 11, Chowrang Residency, Govind Ranade Rd, Laxminarayan Colony, Satavwadi, Hadapsar, Pune, Maharashtra 411028

We're conveniently located in Hadapsar with modern facilities and the latest dermatology equipment. Easy parking available!`;
            }
            
            // Doctor information
            if (this.containsAny(lowercaseMessage, ['doctor', 'dr vaishali', 'experience', 'qualification'])) {
                return `👩‍⚕️ Dr. Vaishali Sapat - Expert Dermatologist

• 11+ Years of Experience
• Specializes in Ayurvedic + Modern Dermatology
• Advanced training in Laser Treatments
• Personalized care approach
• Excellent patient reviews (4.9⭐)

Dr. Vaishali combines traditional Ayurvedic wisdom with modern dermatology for the best results!`;
            }
            
            // Pricing and cost
            if (this.containsAny(lowercaseMessage, ['price', 'cost', 'fee', 'charges', 'affordable'])) {
                return `Our treatment costs vary based on individual needs and condition severity. We believe in transparent pricing with no hidden charges.

For exact pricing information:
• Schedule a consultation first
• Dr. Vaishali will assess your condition  
• Customized treatment plan with costs will be provided

Call +91 83809 12667 for consultation booking. We also offer package deals for multiple sessions!`;
            }
            
            // Advanced treatments
            if (this.containsAny(lowercaseMessage, ['laser', 'advanced', 'prp', 'chemical peel', 'hydrafacial'])) {
                return `🔬 Our Advanced Treatment Options:

• Laser Hair Reduction
• Chemical Peels (All Types)
• HydraFacial & Medical Facials
• PRP & GFC Therapy
• Dermabrasion & Skin Polishing
• Tattoo & Birthmark Removal

All treatments are performed with FDA-approved equipment under Dr. Vaishali's expert supervision.`;
            }
            
            // Reviews and testimonials  
            if (this.containsAny(lowercaseMessage, ['review', 'testimonial', 'rating', 'feedback'])) {
                return `⭐ Our Patient Reviews (4.9/5 from 159+ patients):

"Real improvement in hair growth within few sessions!" - Samruddhi R.

"Laser hair removal gave me smooth, glowing skin!" - Durga A.

"Skin brightening results exceeded expectations!" - Shubhangi P.

"Hair fall reduced significantly with PRP treatment!" - Dipak V.

We're proud of our patient satisfaction record!`;
            }
            
            // General greetings
            if (this.containsAny(lowercaseMessage, ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
                return `Hello! Welcome to SkinAyurveda Hair Skin Laser Clinic! 😊 

I'm here to help you with information about our treatments, booking appointments, or any questions about Dr. Vaishali Sapat's services. 

What would you like to know today?`;
            }
            
            // Default response
            return `Thank you for your question! For specific information about treatments, pricing, or to discuss your particular concern, I'd recommend:

📞 Calling us directly at +91 83809 12667
📧 Emailing skinayurveda11@gmail.com

Dr. Vaishali Sapat will be happy to provide personalized advice during a consultation. Is there anything else I can help you with?`;
        }
        
        containsAny(text, keywords) {
            return keywords.some(keyword => text.includes(keyword));
        }
    }

    // Initialize the chatbot when DOM is loaded
    function initChatbot() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                window.skinAyurvedaChatbot = new SkinAyurvedaChatbot();
            });
        } else {
            window.skinAyurvedaChatbot = new SkinAyurvedaChatbot();
        }
    }

    // Start initialization
    initChatbot();

})();
