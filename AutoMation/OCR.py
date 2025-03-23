import pytesseract
from PIL import Image
import pdf2image
import json
import os
import sys
import tempfile
from pathlib import Path

def extract_text_from_image(image_path):
    """Extract all text from an image using pytesseract OCR."""
    try:
        
        img = Image.open(image_path)
        
        text = pytesseract.image_to_string(img)
        
        return text
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

def extract_text_from_pdf(pdf_path):
    """Extract text from all pages of a PDF document."""
    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            print(f"Converting PDF to images...")
            
            pages = pdf2image.convert_from_path(pdf_path, dpi=300)
            
            print(f"PDF has {len(pages)} pages. Processing...")
            
            all_text = ""
            for i, page in enumerate(pages):
                print(f"Processing page {i+1}/{len(pages)}...")
                text = pytesseract.image_to_string(page)
                all_text += f"\n--- Page {i+1} ---\n" + text
            
            return all_text
    except Exception as e:
        print(f"Error processing PDF: {e}")
        return None

def search_keyword(text, keyword):
    """Search for a keyword in the extracted text and return relevant lines."""
    if not text:
        return []
    
    # Split text into lines
    lines = text.split('\n')
    
    results = [line for line in lines if keyword.lower() in line.lower()]
    
    return results

def save_to_json(file_path, full_text, keyword, results):
    """Save extraction results to a JSON file."""
    base_filename = os.path.splitext(os.path.basename(file_path))[0]
    output_filename = f"{base_filename}_ocr_results.json"
    
    # Prepare data structure
    data = {
        "file_path": file_path,
        "full_text": full_text,
        "keyword": keyword,
        "keyword_results": results,
        "result_count": len(results)
    }
    
    # Save to JSON file
    with open(output_filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    
    return output_filename

def get_supported_file_extensions():
    """Return a list of supported file extensions."""
    # Common image formats
    image_formats = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif', '.gif']
    # Document formats
    document_formats = ['.pdf']
    
    return image_formats + document_formats

def process_file(file_path, keyword):
    """Process a file based on its extension."""
    file_ext = Path(file_path).suffix.lower()
    supported_extensions = get_supported_file_extensions()
    
    if file_ext not in supported_extensions:
        print(f"Unsupported file format: {file_ext}")
        print(f"Supported formats: {', '.join(supported_extensions)}")
        return None, None
    
    # Extract text based on file type
    if file_ext == '.pdf':
        extracted_text = extract_text_from_pdf(file_path)
    else:  # It's an image
        extracted_text = extract_text_from_image(file_path)
    
    # Search for keyword
    if extracted_text:
        results = search_keyword(extracted_text, keyword)
        return extracted_text, results
    else:
        return None, None

def main():
    print("=" * 50)
    print("Advanced OCR Text Extraction with Multiple File Support")
    print("=" * 50)
    
    # Check if pytesseract is installed and configured
    try:
        pytesseract.get_tesseract_version()
    except Exception as e:
        print(f"Error: Tesseract OCR is not properly installed or configured: {e}")
        print("Please install Tesseract OCR and ensure it's in your PATH")
        print("Visit: https://github.com/tesseract-ocr/tesseract")
        sys.exit(1)
    
    # Ask for keyword to search
    keyword = input("Enter the keyword you want to extract: ")
    
    # Ask for file path
    file_path = input("Enter the path to the file (image or PDF): ")
    
    # Validate file path
    if not os.path.exists(file_path):
        print(f"Error: The file {file_path} does not exist.")
        sys.exit(1)
    
    print("\nProcessing file, please wait...")
    
    # Process the file
    extracted_text, results = process_file(file_path, keyword)
    
    if extracted_text:
        # Save results to JSON
        output_file = save_to_json(file_path, extracted_text, keyword, results)
        
        print("\nText extraction completed!")
        print(f"Results saved to: {output_file}")
        
        # Display summary
        print("\nSummary:")
        print(f"Total characters extracted: {len(extracted_text)}")
        print(f"Found {len(results)} lines containing '{keyword}'")
        
        # Display found results (limited to first 10 for readability)
        if results:
            display_limit = min(10, len(results))
            print(f"\nFirst {display_limit} lines containing the keyword:")
            for i, line in enumerate(results[:display_limit], 1):
                print(f"{i}. {line}")
            
            if len(results) > display_limit:
                print(f"...and {len(results) - display_limit} more results (see JSON file for complete list)")
    else:
        print("Failed to extract text from the file.")

if __name__ == "__main__":
    main()