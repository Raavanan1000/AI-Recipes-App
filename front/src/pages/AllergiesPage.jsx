import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { MdControlPoint } from "react-icons/md";
import { useState } from "react";
import Modal from "../components/Modal";
import useApi from "../hooks/useApi";

export default function AllergiesPage() {
  const navigate = useNavigate();
  const { user, addAllergy: userAddAllergy } = useUser();
  const api = useApi();
  const [modalOpen, setModalOpen] = useState(false);
  const [allergy, setAllergy] = useState("");

  async function addAllergy() {
    try {
      await api.addAllergy(allergy);
      setModalOpen(false);
      userAddAllergy(allergy);
    } catch (error) {
      setModalOpen(false);
    }
  }

  return (
    <div className="p-9">
      <button
        className="h-12 text-white font-bold px-5 py-3 self-center bg-[#ff9500] mt-8 rounded-lg mb-7"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <div className="flex flex-col mt-2 w-80 max-w-lg">
        <span className="text-xl font-bold">My Allergies</span>
        <ul className="mt-5 flex flex-row gap-x-3">
          {user.allergis.map((allergie, index) => (
            <li
              className="border border-slate-500 px-5 py-1 rounded-full max-w-fit"
              key={index}
            >
              <span>{allergie}</span>
            </li>
          ))}
        </ul>
      </div>
      <MdControlPoint
        className="fill-slate-500 mt-5 cursor-pointer"
        size={30}
        onClick={() => {
          setModalOpen((prev) => !prev);
        }}
      />
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="flex flex-col gap-y-7">
          <span className="text-2xl font-bold">Allergy</span>
          <form className="flex flex-col">
            <input
              className="h-11 border rounded-lg border-slate-300 hover:border-slate-500 px-2"
              type="text"
              value={allergy}
              onChange={(e) => {
                setAllergy(e.currentTarget.value);
              }}
            />
            <button
              className="h-12 text-white font-bold px-5 self-end bg-info mt-8 rounded-lg"
              type="button"
              onClick={addAllergy}
            >
              Add
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
