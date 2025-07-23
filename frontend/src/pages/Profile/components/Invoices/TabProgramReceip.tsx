import { UserProgram, UserRole } from "@/graphql/hooks";
import { useRole } from "@/services/hooks/useRole";
import { uploadURL } from "@/services/utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Card,
  CardBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Chip,
} from "@heroui/react";
import { CiCreditCard1 } from "react-icons/ci";
import imgDefault from "../../../../../public/default.jpg";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, ReceiptEuro } from "lucide-react";

type TabProgramReceipProps = {
  programs: UserProgram[];
};

export default function TabProgramReceip({ programs }: TabProgramReceipProps) {
  const isCoach = useRole(UserRole.Coach);
  const isStudent = useRole(UserRole.Student);

  const columns = [
    { name: "Acheteur", uid: "profile" },
    { name: "Programme", uid: "program" },
    { name: "Montant payé", uid: "amount" },
    ...(isCoach ? [{ name: "Montant versé", uid: "coachPaid" }] : []),
    { name: "Date de paiement", uid: "paidAt" },
    { name: "Statut", uid: "status" },
    { name: "Actions", uid: "actions" },
  ];

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      const date = parseISO(dateString);
      return format(date, "dd/MM/yyyy", { locale: fr });
    } catch (error) {
      console.error(error);
      return "-";
    }
  };

  const renderStatus = (value: string) => {
    switch (value) {
      case "completed":
        return (
          <Chip color="success" variant="flat" size="sm" className="px-2">
            Payée
          </Chip>
        );
      case "paid":
        return (
          <Chip color="primary" variant="flat" size="sm" className="px-2">
            En cours
          </Chip>
        );
      case "expired":
        return (
          <Chip color="default" variant="flat" size="sm" className="px-2">
            Expiré
          </Chip>
        );
      default:
        return (
          <Chip color="warning" variant="flat" size="sm" className="px-2">
            {value}
          </Chip>
        );
    }
  };

  return (
    <section className="w-full flex flex-col gap-2 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Programme(s)</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CiCreditCard1 className="w-6 h-6" />
          <span>{programs.length} Reçu(s)</span>
        </div>
      </div>

      <Card className="shadow-sm border-t">
        <CardBody className="p-0">
          <Table
            aria-label="Table des factures"
            classNames={{
              wrapper: "shadow-sm",
              th: "bg-gray-50/50 text-gray-700 font-semibold",
              td: "py-4",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  className="bg-gray-50/50"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>

            {programs.length ? (
              <TableBody items={programs}>
                {(program) => (
                  <TableRow key={program.id}>
                    {columns.map((column) => {
                      switch (column.uid) {
                        case "profile":
                          return (
                            <TableCell key="profile">
                              <User
                                avatarProps={{
                                  src: program.user.avatar
                                    ? `${uploadURL + program.user.avatar}`
                                    : imgDefault,
                                }}
                                description={program.user.email}
                                name={`${program.user.firstname} ${program.user.lastname}`}
                              />
                            </TableCell>
                          );
                        case "program":
                          return (
                            <TableCell key="program">
                              <p className="text-xs">
                                {program.program?.title ?? "-"}
                              </p>
                            </TableCell>
                          );
                        case "amount":
                          return (
                            <TableCell key="amount">
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">
                                  {formatAmount(program.price, "eur")}
                                </span>
                                <span className="text-xs text-gray-500">
                                  EUR
                                </span>
                              </div>
                            </TableCell>
                          );
                        case "coachPaid":
                          return (
                            <TableCell key="coachPaid">
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">
                                  {formatAmount(
                                    Math.round(program.price * (1-program.commissionRate)*100)/100,
                                    "eur"
                                  )}
                                </span>
                                <span className="text-xs text-gray-500">
                                  EUR
                                </span>
                              </div>
                            </TableCell>
                          );
                        case "paidAt":
                          return (
                            <TableCell key="paidAt">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700">
                                  {formatDate(program.paidAt)}
                                </span>
                              </div>
                            </TableCell>
                          );
                        case "status":
                          return (
                            <TableCell key="status">
                              {renderStatus(program.status)}
                            </TableCell>
                          );
                        case "actions":
                          return (
                            <TableCell key="actions">
                              <div className="flex items-center justify-center">
                                {program.receip ? (
                                  <Tooltip
                                    content="Voir le reçu PDF"
                                    showArrow={true}
                                    color="foreground"
                                    className="text-xs"
                                  >
                                    <a
                                      href={program.receip}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                    >
                                      <ReceiptEuro className="w-4 h-4" />
                                    </a>
                                  </Tooltip>
                                ) : (
                                  <span className="text-gray-300 text-xs italic">
                                    Aucun reçu
                                  </span>
                                )}
                              </div>
                            </TableCell>
                          );
                        default:
                          return <TableCell key={column.uid}>-</TableCell>;
                      }
                    })}
                  </TableRow>
                )}
              </TableBody>
            ) : (
              <TableBody
                emptyContent={
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <CiCreditCard1 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucun reçu
                    </h3>
                    <p className="text-gray-500 text-center max-w-sm">
                      {isStudent &&
                        "Tes reçus apparaîtront ici une fois que tu auras souscrit à un ou plusieurs programmes."}
                      {isCoach &&
                        "Tes reçus apparaîtront ici une fois que des élèves auront souscrit à l’un de tes programmes."}
                    </p>
                  </div>
                }
              >
                {[]}
              </TableBody>
            )}
          </Table>
        </CardBody>
      </Card>
    </section>
  );
}
