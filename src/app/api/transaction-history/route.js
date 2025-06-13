export async function GET() {
    const data = [
        { id: 1, date: "2023-06-24", to_ref: "ABV Enterprice", reference_id: "#4344343444", transaction_type: "DuitNowPayment", amount: "RM 1,200.00" },
        { id: 2, date: "2023-07-12", to_ref: "BCD Enterprice", reference_id: "#4564564564", transaction_type: "DuitNowPayment", amount: "RM 54,871.00" },
        { id: 3, date: "2023-07-14", to_ref: "FGRF Enterprice", reference_id: "#9896656455", transaction_type: "DuitNowPayment", amount: "RM 100.00" },
        { id: 4, date: "2023-08-20", to_ref: "sGRFD Enterprice", reference_id: "#7986678232", transaction_type: "DuitNowPayment", amount: "RM 10,000.00" },
    ];

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}