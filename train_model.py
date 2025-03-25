import pandas as pd
import re
import pickle
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB

# Download stopwords (if not already available)
nltk.download("stopwords")

# Load dataset
df = pd.read_csv("dataset.csv", encoding="utf-8", quotechar='"')

# Drop 'Unnamed: 0' column if it exists
if "Unnamed: 0" in df.columns:
    df.drop(columns=["Unnamed: 0"], inplace=True)

# Rename 'text' column to 'message' if needed
if "text" in df.columns:
    df.rename(columns={"text": "message"}, inplace=True)

# Convert labels to numeric values
df["label"] = df["label"].map({"ham": 0, "spam": 1})

# Ensure no missing values
df.dropna(subset=["message"], inplace=True)

# Fix the text cleaning function
def clean_text(text):
    if pd.isna(text):  # Handle missing values
        return ""
    text = text.lower()  # Convert to lowercase
    text = re.sub(r"\d+", "", text)  # Remove numbers
    text = re.sub(r"\W+", " ", text)  # Remove non-word characters
    text = " ".join(text.split())  # Remove extra spaces
    return text

# Apply text cleaning
df["message"] = df["message"].apply(clean_text)

# Feature extraction using TF-IDF
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["message"])
y = df["label"]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Naive Bayes model
model = MultinomialNB()
model.fit(X_train, y_train)

# Save model and vectorizer using pickle
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))

# ✅ Test if model can predict spam
sample_text = ["Congratulations! You've won a free iPhone. Click here to claim now."]
sample_vectorized = vectorizer.transform(sample_text)
prediction = model.predict(sample_vectorized)[0]

print(f"Test Prediction for spam sample: {'Spam' if prediction == 1 else 'Ham'}")
print("✅ Model and vectorizer saved successfully!")
