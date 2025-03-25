from flask import Flask, render_template, request
import pickle
import re

# Load model & vectorizer
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

app = Flask(__name__)

# Text cleaning function (same as in training)
def clean_text(text):
    text = text.lower()
    text = re.sub(r"\d+", "", text)  # Remove numbers
    text = re.sub(r"\W+", " ", text)  # Remove non-word characters
    text = " ".join(text.split())  # Remove extra spaces
    return text

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        email_content = request.form["email"]
        
        # Clean and transform input
        cleaned_email = clean_text(email_content)
        email_vectorized = vectorizer.transform([cleaned_email])
        
        # Predict (0 = Ham, 1 = Spam)
        prediction = model.predict(email_vectorized)[0]
        result = "Spam" if prediction == 1 else "Ham"
        
        return render_template("result.html", email=email_content, result=result)

if __name__ == "__main__":
    app.run(debug=True)
