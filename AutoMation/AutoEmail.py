import json
import re
import os
import sys
from datetime import datetime

def load_ocr_json(json_path):
    """Load and parse the OCR JSON file."""
    try:
        with open(json_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            return data
    except Exception as e:
        print(f"Error loading JSON file: {e}")
        return None

def extract_emails(text):
    """Extract email addresses from text using regex."""
    # Email regex pattern
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    
    # Find all matches
    emails = re.findall(email_pattern, text)
    
    # Return unique emails
    return list(set(emails))

def simulate_email_sending(recipient_email):
    """Simulate sending an email to the recipient without actually sending."""
    current_date = datetime.now().strftime("%B %d, %Y")
    
    print(f"\n--- Simulated Email to: {recipient_email} ---")
    print(f"Date: {current_date}")
    print("Subject: Automated Message from OCR System")
    print("\nHello,")
    print(f"This is an automated message sent on {current_date}.")
    print("Your email address was detected by our OCR system.")
    print("This is a test message and requires no action on your part.")
    print("\nBest regards,")
    print("Automated System")
    print("--- End of Simulated Email ---\n")

def main():
    print("=" * 50)
    print("Email Detector from OCR JSON Data")
    print("=" * 50)
    
    # Get input JSON file
    json_path = input("Enter the path to the OCR JSON file: ")
    
    # Validate file path
    if not os.path.exists(json_path):
        print(f"Error: The file {json_path} does not exist.")
        sys.exit(1)
    
    # Load JSON data
    print("\nLoading OCR data...")
    data = load_ocr_json(json_path)
    
    if not data:
        print("Failed to load OCR data.")
        sys.exit(1)
    
    # Extract text from JSON
    full_text = data.get('full_text', '')
    
    # Extract emails from text
    print("Searching for email addresses...")
    emails = extract_emails(full_text)
    
    # Display found emails
    if emails:
        print(f"\n✓ Found {len(emails)} email address(es):")
        for i, email in enumerate(emails, 1):
            print(f"{i}. {email}")
        
        # Simulate sending emails
        print("\n" + "=" * 50)
        print("SIMULATING EMAIL SENDING (No actual emails sent)")
        print("=" * 50)
        
        for email in emails:
            print(f"✓ Simulating email to: {email}")
            simulate_email_sending(email)
        
        print(f"Simulation complete. Would have sent emails to {len(emails)} addresses.")
        
        # Option to save found emails to a separate file
        save_option = input("\nDo you want to save the found email addresses to a file? (y/n): ")
        if save_option.lower() == 'y':
            output_file = os.path.splitext(json_path)[0] + "_emails.txt"
            with open(output_file, 'w') as f:
                for email in emails:
                    f.write(email + '\n')
            print(f"Email addresses saved to {output_file}")
    else:
        print("No email addresses found in the OCR data.")

if __name__ == "__main__":
    main()