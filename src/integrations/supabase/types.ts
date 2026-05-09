export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          details: Json
          id: string
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          details?: Json
          id?: string
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          details?: Json
          id?: string
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: []
      }
      agents: {
        Row: {
          address: string | null
          city: string | null
          code: string
          created_at: string
          enabled: boolean
          id: string
          image_url: string | null
          name: string
          phone: string | null
          rating: number | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          code: string
          created_at?: string
          enabled?: boolean
          id?: string
          image_url?: string | null
          name: string
          phone?: string | null
          rating?: number | null
        }
        Update: {
          address?: string | null
          city?: string | null
          code?: string
          created_at?: string
          enabled?: boolean
          id?: string
          image_url?: string | null
          name?: string
          phone?: string | null
          rating?: number | null
        }
        Relationships: []
      }
      app_config: {
        Row: {
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      deposit_requests: {
        Row: {
          agent_id: string | null
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["currency"]
          id: string
          method: string
          note: string | null
          receipt_url: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          status: Database["public"]["Enums"]["request_status"]
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          amount: number
          created_at?: string
          currency: Database["public"]["Enums"]["currency"]
          id?: string
          method: string
          note?: string | null
          receipt_url?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          user_id: string
        }
        Update: {
          agent_id?: string | null
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency"]
          id?: string
          method?: string
          note?: string | null
          receipt_url?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deposit_requests_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_plans: {
        Row: {
          badge: string | null
          created_at: string
          description: string | null
          duration: number
          duration_unit: string
          enabled: boolean
          featured: boolean
          id: string
          max_amount: number
          min_amount: number
          name: string
          profit_rate: number
          profit_type: string
          risk: Database["public"]["Enums"]["risk_level"]
        }
        Insert: {
          badge?: string | null
          created_at?: string
          description?: string | null
          duration: number
          duration_unit: string
          enabled?: boolean
          featured?: boolean
          id?: string
          max_amount: number
          min_amount: number
          name: string
          profit_rate: number
          profit_type: string
          risk?: Database["public"]["Enums"]["risk_level"]
        }
        Update: {
          badge?: string | null
          created_at?: string
          description?: string | null
          duration?: number
          duration_unit?: string
          enabled?: boolean
          featured?: boolean
          id?: string
          max_amount?: number
          min_amount?: number
          name?: string
          profit_rate?: number
          profit_type?: string
          risk?: Database["public"]["Enums"]["risk_level"]
        }
        Relationships: []
      }
      investments: {
        Row: {
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["currency"]
          end_date: string | null
          id: string
          plan_id: string
          start_date: string
          status: string
          total_profit: number
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency"]
          end_date?: string | null
          id?: string
          plan_id: string
          start_date?: string
          status?: string
          total_profit?: number
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency"]
          end_date?: string | null
          id?: string
          plan_id?: string
          start_date?: string
          status?: string
          total_profit?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "investments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "investment_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_requests: {
        Row: {
          created_at: string
          doc_back_url: string | null
          doc_front_url: string | null
          doc_number: string | null
          doc_type: string
          full_name: string
          id: string
          rejection_reason: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          selfie_url: string | null
          status: Database["public"]["Enums"]["request_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          doc_back_url?: string | null
          doc_front_url?: string | null
          doc_number?: string | null
          doc_type: string
          full_name: string
          id?: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          selfie_url?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          doc_back_url?: string | null
          doc_front_url?: string | null
          doc_number?: string | null
          doc_type?: string
          full_name?: string
          id?: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          selfie_url?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          user_id?: string
        }
        Relationships: []
      }
      ledger_entries: {
        Row: {
          account: string
          created_at: string
          credit: number
          currency: Database["public"]["Enums"]["currency"]
          debit: number
          id: string
          transaction_id: string
        }
        Insert: {
          account: string
          created_at?: string
          credit?: number
          currency: Database["public"]["Enums"]["currency"]
          debit?: number
          id?: string
          transaction_id: string
        }
        Update: {
          account?: string
          created_at?: string
          credit?: number
          currency?: Database["public"]["Enums"]["currency"]
          debit?: number
          id?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_entries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          id: string
          read: boolean
          title: string
          user_id: string | null
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          read?: boolean
          title: string
          user_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          read?: boolean
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          kyc_status: Database["public"]["Enums"]["kyc_status"]
          phone: string | null
          public_id: string
          status: Database["public"]["Enums"]["user_status"]
          transaction_pin_hash: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          phone?: string | null
          public_id?: string
          status?: Database["public"]["Enums"]["user_status"]
          transaction_pin_hash?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          phone?: string | null
          public_id?: string
          status?: Database["public"]["Enums"]["user_status"]
          transaction_pin_hash?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          completed_at: string | null
          counterparty_id: string | null
          created_at: string
          currency: Database["public"]["Enums"]["currency"]
          fee: number
          id: string
          idempotency_key: string | null
          metadata: Json
          note: string | null
          reference: string | null
          status: Database["public"]["Enums"]["tx_status"]
          type: Database["public"]["Enums"]["tx_type"]
          user_id: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          counterparty_id?: string | null
          created_at?: string
          currency: Database["public"]["Enums"]["currency"]
          fee?: number
          id?: string
          idempotency_key?: string | null
          metadata?: Json
          note?: string | null
          reference?: string | null
          status?: Database["public"]["Enums"]["tx_status"]
          type: Database["public"]["Enums"]["tx_type"]
          user_id: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          counterparty_id?: string | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency"]
          fee?: number
          id?: string
          idempotency_key?: string | null
          metadata?: Json
          note?: string | null
          reference?: string | null
          status?: Database["public"]["Enums"]["tx_status"]
          type?: Database["public"]["Enums"]["tx_type"]
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance: number
          currency: Database["public"]["Enums"]["currency"]
          id: string
          locked: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          currency: Database["public"]["Enums"]["currency"]
          id?: string
          locked?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          currency?: Database["public"]["Enums"]["currency"]
          id?: string
          locked?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      withdraw_requests: {
        Row: {
          agent_id: string | null
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["currency"]
          destination: Json
          id: string
          method: string
          note: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          status: Database["public"]["Enums"]["request_status"]
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          amount: number
          created_at?: string
          currency: Database["public"]["Enums"]["currency"]
          destination?: Json
          id?: string
          method: string
          note?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          user_id: string
        }
        Update: {
          agent_id?: string | null
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency"]
          destination?: Json
          id?: string
          method?: string
          note?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdraw_requests_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_adjust_balance: {
        Args: {
          _currency: Database["public"]["Enums"]["currency"]
          _delta: number
          _note: string
          _user_id: string
        }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      process_transfer: {
        Args: {
          _amount: number
          _currency: Database["public"]["Enums"]["currency"]
          _idempotency_key: string
          _note?: string
          _to_public_id: string
        }
        Returns: string
      }
      set_transaction_pin: { Args: { _pin: string }; Returns: undefined }
      verify_transaction_pin: { Args: { _pin: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      currency: "SYP" | "USD"
      kyc_status: "none" | "pending" | "approved" | "rejected"
      request_status: "pending" | "approved" | "rejected"
      risk_level: "low" | "medium" | "high"
      tx_status: "pending" | "completed" | "failed" | "cancelled"
      tx_type:
        | "deposit"
        | "withdraw"
        | "transfer_in"
        | "transfer_out"
        | "investment"
        | "profit"
        | "exchange"
        | "admin_credit"
        | "admin_debit"
        | "fee"
      user_status: "active" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      currency: ["SYP", "USD"],
      kyc_status: ["none", "pending", "approved", "rejected"],
      request_status: ["pending", "approved", "rejected"],
      risk_level: ["low", "medium", "high"],
      tx_status: ["pending", "completed", "failed", "cancelled"],
      tx_type: [
        "deposit",
        "withdraw",
        "transfer_in",
        "transfer_out",
        "investment",
        "profit",
        "exchange",
        "admin_credit",
        "admin_debit",
        "fee",
      ],
      user_status: ["active", "suspended"],
    },
  },
} as const
