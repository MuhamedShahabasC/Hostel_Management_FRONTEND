import { useState, useEffect, useMemo } from "react";
import { allMealPlans } from "../../apiRoutes/staff";
import Table, { TableColumn, Media } from "../../components/Table";
import { errorToast } from "../../middleware/errorToast";
import Modal from "../../components/UI/Modal";

interface TableRow {
  _id: string;
  title: string;
  price: number;
  subscribers: number;
  active: number;
  actions: string;
}

function MealsChef() {
  const [allMeals, setAllMeals] = useState<any>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [modalOpen, setModal] = useState<boolean>(false);
  const [ModalData, setModalData] = useState<any>(null);

  useEffect(() => {
    allMealPlans()
      .then(({ data: { data } }) => setAllMeals(data))
      .catch((err) => errorToast(err.message))
      .finally(() => setPending(false));
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
            <>
              <button
                className="border"
                onClick={() => {
                  setModalData(row);
                  setModal(true);
                }}
              >
                View
              </button>
              <button onClick={() => alert(row.active)}>Edit</button>
            </>
          );
        },
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    []
  );
  return (
    <div className="parent-container ">
      <h2>Meals Plan</h2>
      <Table columns={columns} data={allMeals} pending={pending} />
      <Modal isOpen={modalOpen} heading="Heading" closeHandler={setModal}>
        <p>{ModalData?.title}</p>
      </Modal>
    </div>
  );
}

export default MealsChef;
