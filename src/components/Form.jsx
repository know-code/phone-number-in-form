import { Controller, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import Input from "react-phone-number-input/input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { countries } from "../constants/countries";

const validationSchema = Yup.object().shape({
  amount: Yup.string().required("Amount is required!"),
  country: Yup.string().required("Country is required!"),
  destinationAccount: Yup.string()
    .required("Phone Number is required!")
    .test(
      "accountValid",
      "Not a valid phone number for selected country",
      (value) => isValidPhoneNumber(value)
    ),
});

const defaultValues = {
  country: "",
  destinationAmount: "",
};

const Form = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = (data) => {
    alert(
      `You have successfully transfered ${data.amount} to ${data.destinationAccount}`
    );
    console.log(data);
  };
  return (
    <div className="card p-4 mx-auto">
      <div className="mb-3">
        <h4>Mobile Money Transfer</h4>
        <hr />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            {...register("country", { required: true })}
            className={`form-control ${
              errors?.country?.message ? "is-invalid" : ""
            }`}
            aria-label="Country select"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.country?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="destinationAccount" className="form-label">
            Phone Number
          </label>
          <Controller
            control={control}
            name="destinationAccount"
            id="destinationAccount"
            rules={{
              validate: (value) => isValidPhoneNumber(value),
            }}
            render={({ field: { onChange } }) => (
              <Input
                control={control}
                country={getValues()?.country}
                placeholder=""
                className={`form-control ${
                  errors?.destinationAccount?.message ? "is-invalid" : ""
                }`}
                id="destinationAccount"
                name="destinationAccount"
                value={getValues().destinationAccount}
                onChange={(value) => {
                  return onChange({ target: { value: value || "" } });
                }}
              />
            )}
          />
          <div className="invalid-feedback">
            {errors?.destinationAccount?.message}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { required: true })}
            className={`form-control ${
              errors?.amount?.message ? "is-invalid" : ""
            }`}
            aria-label="amount select"
          />
          <div className="invalid-feedback">{errors?.amount?.message}</div>
        </div>

        <div className="d-grid mb-3">
          <input
            type="submit"
            className="btn btn-outline-primary btn-sm btn-block"
            value="Make Transfer"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
