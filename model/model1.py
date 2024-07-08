import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import numpy as np

import joblib

df = pd.read_csv(r'E:\Semester6\ML_OEL\loan_sanction_train.csv')
# df.head()

# Drop the 'Loan_ID' column
df = df.drop('Loan_ID', axis=1)

# Drop rows with any null values
df = df.dropna()

# Identify categorical columns (dtype 'object' or 'category')
categorical_cols = df.select_dtypes(include=['object', 'category']).columns

# Apply one-hot encoding to categorical columns only
df_encoded = pd.get_dummies(df, columns=categorical_cols)

df_encoded = df_encoded.astype(int)
df_encoded.head()


df_encoded=df_encoded.drop('Loan_Status_N',axis=1)




X = df_encoded.drop('Loan_Status_Y', axis=1) # remove the column 'Loan_Status'
y = df_encoded['Loan_Status_Y']



# Splitting the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Initializing the Logistic Regression model
model = LogisticRegression()

# Fitting the model to the training data
model.fit(X_train, y_train)


joblib.dump(model,"loan_prediction_model.joblib")



# # Making predictions on the test set
# y_pred = model.predict(X_test)

# # Example input features for prediction
# # Replace these values with your actual example
# example = np.array([[3000,	0,	40,	360,0,0,0,0,1,1,1,0,1,0,1,1,1,1,1,1]])

# # Making prediction using the trained model
# example_prediction = model.predict(example)
# example_probability = model.predict_proba(example)

# print("Predicted Class:", example_prediction[0])
# print("Prediction Probabilities:", example_probability[0])