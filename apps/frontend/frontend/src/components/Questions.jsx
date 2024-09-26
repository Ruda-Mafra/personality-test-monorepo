import { useState } from "react";
import { Label, Radio } from "flowbite-react";

const Questions = () => {
  return (
    <div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
      <fieldset className="flex max-w-md flex-col gap-4">
        <legend className="mb-4">Choose your favorite country</legend>
        <div className="flex items-center gap-2">
          <Radio
            id="united-state"
            name="countries"
            value="USA"
          />
          <Label htmlFor="united-state">United States</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="germany" name="countries" value="Germany" />
          <Label htmlFor="germany">Germany</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="spain" name="countries" value="Spain" />
          <Label htmlFor="spain">Spain</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="uk" name="countries" value="United Kingdom" />
          <Label htmlFor="uk">United Kingdom</Label>
        </div>
      </fieldset>
    </div>
  );
};

export default Questions;
