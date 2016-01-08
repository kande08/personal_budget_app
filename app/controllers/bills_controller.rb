class BillsController < ApplicationController
  def index
    @bills = Bill.all.order(amount: :desc)
  end

  def update
    @bill = Bill.find(params[:id])
    @bill.update(bill_params)
    render 'bill'
  end

  def create
    @bill = Bill.create(bill_params)
    render 'bill'
  end

  def destroy
    @bill = Bill.find(params[:id]).destroy
    head :ok
  end

  private
    def bill_params
      params.require(:bill).permit(:name, :amount, :category, :due_date)
    end
end
