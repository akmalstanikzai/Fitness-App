import sys
import pickle
import json
import numpy as np
import pandas as pd

def load_model(model_type):
    print(f"Loading model: {model_type}")
    try:
        if model_type == 'model1':
            with open('C:/Users/Akmal/Desktop/FYP/Code/Backend/ai_model/nutrition_model.pkl', 'rb') as f:
                model = pickle.load(f)
        elif model_type == 'model2':
            with open('C:/Users/Akmal/Desktop/FYP/Code/Backend/ai_model/workout_model.pkl', 'rb') as f:
                model = pickle.load(f)
        else:
            raise ValueError("Invalid model type")
        print(f"Model {model_type} loaded successfully")
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        raise

def generate_plan(model_type, user_input):
    print("Generating plan")
    model = load_model(model_type)
    print("Model loaded")
    try:
        user_data = json.loads(user_input)
        print(f"User data: {user_data}")
        # Convert user_data to a DataFrame
        user_data_df = pd.DataFrame([user_data])
        print(f"User data DataFrame: {user_data_df}")
        # Generate the plan using the model
        plan = model.predict(user_data_df)  # Adjust this based on how your model works
        print("Plan generated")
        return plan
    except Exception as e:
        print(f"Error generating plan: {e}")
        raise

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python generate_plan.py <model_type> <user_input>")
        sys.exit(1)

    model_type = sys.argv[1]
    user_input = sys.argv[2]
    try:
        print("Starting plan generation")
        plan = generate_plan(model_type, user_input)
        print(plan)
    except ValueError as e:
        print(e)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")