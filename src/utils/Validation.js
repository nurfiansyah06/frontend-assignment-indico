export const validateUserForm = (formData, setErrors) => {
  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!formData.email.includes("@")) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.company?.name.trim()) {
    newErrors.company = "Company is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateUserForm;