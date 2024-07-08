from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib


# Load the trained model
model = joblib.load(r'E:\Semester6\ML_OEL\loan_prediction_model.joblib')

app = FastAPI()

class PredictionRequest(BaseModel):
    income: float
    coapplicant_income: float
    loan_amount: float
    loan_amount_term: float
    credit_history: int
    gender_male: int
    gender_female: int
    married_yes: int
    married_no: int
    dependents_0: int
    dependents_1: int
    dependents_2: int
    dependents_3_plus: int
    education_graduate: int
    education_not_graduate: int
    self_employed_yes: int
    self_employed_no: int
    property_area_rural: int
    property_area_semiurban: int
    property_area_urban: int

@app.post("/predict")
def predict(request: PredictionRequest):
    example = np.array([[request.income, request.coapplicant_income, request.loan_amount, request.loan_amount_term,
                         request.credit_history, request.gender_male, request.gender_female, request.married_yes, 
                         request.married_no, request.dependents_0, request.dependents_1, request.dependents_2, 
                         request.dependents_3_plus, request.education_graduate, request.education_not_graduate, 
                         request.self_employed_yes, request.self_employed_no, request.property_area_rural, 
                         request.property_area_semiurban, request.property_area_urban]])

    example_prediction = model.predict(example)
    return {"Predicted Class": int(example_prediction[0])}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
