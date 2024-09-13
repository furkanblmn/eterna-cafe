<?php

namespace App\Http\Controllers;

use App\Helpers\Output;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register_page()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(RegisterRequest $request)
    {
        DB::beginTransaction();

        try {
            $inputs = $request->validated();
            User::create($inputs);

            DB::commit();
            return Output::ok("Kayıt işlemi başarılı");
        } catch (Exception $e) {
            DB::rollBack();
            return Output::fails($e->getMessage());
        }
    }

    public function login_page()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(LoginRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return Output::fails('Geçersiz giriş bilgileri.');
            }

            Auth::login($user);
            return Output::ok(['message' => 'Giriş başarılı, yönlendiriliyorsunuz.']);
        } catch (Exception $e) {
            return Output::fails($e->getMessage());
        }
    }

    public function forgot_page()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function reset_password(ResetPasswordRequest $request)
    {
        DB::beginTransaction();

        try {
            $email = $request->email;
            $token = Str::random(60);

            DB::table('password_resets')->where('email', $email)->delete();

            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token,
                'created_at' => Carbon::now(),
            ]);

            Mail::send('emails.reset_password', ['token' => $token], function ($message) use ($email) {
                $message->to($email)->subject('Parola Sıfırlama Talebi');
            });

            DB::commit();
            return Output::ok(['message' => 'Parola sıfırlama bağlantısı email adresinize gönderildi.']);
        } catch (Exception $e) {
            DB::rollBack();
            return Output::fails($e->getMessage());
        }
    }

    public function update_pass_page(Request $request)
    {
        $password_reset = DB::table('password_resets')
            ->where('token', $request->query('token'))
            ->first();

        if (!$password_reset) {
            return redirect()->route('forgot_page')->withErrors(['message' => 'Token geçersiz.']);
        }

        return Inertia::render('Auth/UpdatePassword', [
            'email' => $password_reset->email,
            'token' => $request->query('token'),
        ]);
    }

    public function update_password(UpdatePasswordRequest $request)
    {
        DB::beginTransaction();

        try {
            $reset = DB::table('password_resets')
                ->where([
                    'token' => $request->token,
                    'email' => $request->email,
                ])
                ->first();

            if (!$reset) {
                return Output::fails('Token geçersiz veya süresi dolmuş.');
            }

            $user = User::where('email', $request->email)->firstOrFail();
            $user->password = Hash::make($request->password);
            $user->save();

            DB::table('password_resets')->where('email', $request->email)->delete();

            DB::commit();
            return Output::ok(['message' => 'Parolanız başarıyla güncellendi.']);
        } catch (Exception $e) {
            DB::rollBack();
            return Output::fails($e->getMessage());
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }
}
