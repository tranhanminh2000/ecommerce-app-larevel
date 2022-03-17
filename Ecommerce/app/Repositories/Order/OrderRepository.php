<?php

namespace App\Repositories\Order;

use App\Models\Book;
use App\Models\Order;
use Exception;
use Illuminate\Support\Facades\DB;


class OrderRepository
{
    public function createOrder($userId, $orderAmount, $cart)
    {

        DB::beginTransaction();

        try {
            $idOrder = DB::table("order")->insertGetId(
                [
                    'user_id' => $userId,
                    'order_date' => date_format(date_create(), 'Y-m-d H:i:s'),
                    'order_amount' => $orderAmount
                ]
            );

            $cartMapped = collect($cart)->map(function ($value) use ($idOrder) {
                return [
                    "order_id" => $idOrder,
                    "book_id" => $value["bookId"],
                    "quantity" => $value["quantity"],
                    "price" => $value["price"],
                ];
            })->all();

            $unavailableItems = [];
            foreach ($cartMapped as  $item) {
                if (!Book::where("id", "=", $item['book_id'])->exists()) {
                    $unavailableItems[] = $item['book_id'];
                }
            }

            if (count($unavailableItems)) {
                throw new Exception("error", 1);
            } else {
                DB::table("order_item")->insert($cartMapped);
                DB::commit();
                return response()->json([
                    "success" => true,
                    "message" => "Order successfully"
                ], 200);;
            }
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                "success" => false,
                "message" => "Order failed",
                "data" => $unavailableItems
            ], 400);
        }
    }
}
