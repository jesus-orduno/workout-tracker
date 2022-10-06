addWorkoutHandler = async () => {
    const exercise_name = document.querySelector('#addWorkoutName').value.trim();
    const exercise_description = document.querySelector('#addWorkoutDescription').value.trim();
    const stringCategory = document.querySelector('#addWorkoutCategory').value.trim();
    const exercise_equipment = document.querySelector('#addWorkoutEquipment').value.trim();
    let exercise_category = 0;
    if (stringCategory === 'Cardio') {
        exercise_category = 1;
    } else if (stringCategory === 'Strength') {
        exercise_category = 2;
    } else if (stringCategory === 'Flexibility') {
        exercise_category = 3;
    } else if (stringCategory === 'Balance') {
        exercise_category = 4;
    }
    if (exercise_name && exercise_description && exercise_category && exercise_equipment) {
        const response = await fetch('/api/exercises', {
            method: 'POST',
            body: JSON.stringify({ exercise_name, exercise_description, exercise_category, exercise_equipment }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } else if (exercise_name && exercise_description && exercise_category) {
        const response = await fetch('/api/exercises', {
            method: 'POST',
            body: JSON.stringify({ exercise_name, exercise_description, exercise_category }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};