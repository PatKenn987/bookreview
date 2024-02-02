import { createClient } from "@supabase/supabase-js";

//This module will create the supabase client
const supabaseUrl = "https://wwwlgjzfasgmqdornlma.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3d2xnanpmYXNnbXFkb3JubG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzNTM2NDYsImV4cCI6MjAyMDkyOTY0Nn0.91ND4mgZapxmGm-ovK96kb2il3sO4SQqg801InyhTcE";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
