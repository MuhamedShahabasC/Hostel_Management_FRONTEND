import { useState, useEffect, useMemo, useCallback } from "react";
import {
  allMealPlans,
  changeAvailabilityMealPlan,
} from "../../apiRoutes/staff";
import Table, { TableColumn, Media } from "../../components/Table";
import { errorToast } from "../../helpers/toasts";
import Modal from "../../components/UI/Modal";
import Button from "../../components/UI/Button";
import { toast } from "react-toastify";
import { disableIcon, tickIcon, viewIcon } from "../../assets/icons/icons";
import MealPlanForm from "../../components/Form/MealPlan";

interface TableRow {
  _id: string;
  title: string;
  price: number;
  subscribers: number;
  active: number;
  actions: string;
}

function MealsChef() {
  const [pending, setPending] = useState<boolean>(true);
  const [modalOpen, setModal] = useState<boolean>(false);
  const [allMeals, setAllMeals] = useState<any>([]);
  const [modalData, setModalData] = useState<any>(null);
  const [formRole, setFormRole] = useState<"new" | "edit">("edit");

  const fetchAllMeals = useCallback(() => {
    allMealPlans()
      .then(({ data: { data } }) => setAllMeals(data))
      .catch((err) => errorToast(err.message))
      .finally(() => setPending(false));
  }, []);

  useEffect(() => {
    fetchAllMeals();
    // eslint-disable-next-line
  }, []);

  const columns: TableColumn<TableRow>[] = useMemo(
    () => [
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Availability",
        selector: (row) => (row.active ? "In-Menu" : "Unavailable"),
        sortable: true,
        hide: Media.SM,
      },
      {
        name: "Price",
        selector: (row) => row.price,
        sortable: true,
        hide: Media.SM,
      },
      {
        name: "Students",
        selector: (row) => row.subscribers,
        sortable: true,
        hide: Media.SM,
      },
      {
        name: "Actions",
        grow: 2,
        cell: (row) => {
          return (
            <div className="gap-2">
              <button
                onClick={() => {
                  setModalData(row);
                  setModal(true);
                  setFormRole("edit");
                }}
              >
                <img
                  className="image-button h-7"
                  src={viewIcon}
                  alt="view details"
                />
              </button>
              <button
                onClick={async () =>
                  await changeAvailabilityMealPlan(row._id)
                    .then(fetchAllMeals)
                    .then(() => toast.success(`${row.title} plan updated`))
                }
              >
                {row.active ? (
                  <img
                    className="image-button h-7"
                    src={tickIcon}
                    alt="active meal"
                  />
                ) : (
                  <img
                    className="image-button h-7"
                    src={disableIcon}
                    alt="disabled meal"
                  />
                )}
              </button>
            </div>
          );
        },
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    // eslint-disable-next-line
    []
  );

  const newMealPlanHandler = (): void => {
    setFormRole("new");
    setModalData([]);
    setModal(true);
  };

  return (
    <div className="parent-container ">
      <h2>Meals Plan</h2>
      <Table columns={columns} data={allMeals} pending={pending} />
      <Button
        className="max-w-max px-9 text-sm mx-auto mt-3"
        type="button"
        onClick={newMealPlanHandler}
      >
        New Meal Plan
      </Button>
      <Modal
        isOpen={modalOpen}
        heading="Meal Plan Details"
        closeHandler={setModal}
      >
        {modalData && (
          <MealPlanForm
            fetchAllMeals={fetchAllMeals}
            modalData={modalData}
            role={formRole}
            setModal={setModal}
          />
        )}
      </Modal>
    </div>
  );
}

export default MealsChef;
